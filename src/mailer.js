const nodemailer = require('nodemailer');

const localMailFallback = process.env.NODE_ENV !== 'production';

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_PORT && (process.env.SMTP_FROM || process.env.SMTP_USER));
}

function resendConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

function emailFrom() {
  return process.env.EMAIL_FROM
    || process.env.RESEND_FROM
    || process.env.SMTP_FROM
    || process.env.SMTP_USER
    || 'Cara Mia <onboarding@resend.dev>';
}

function emailConfigStatus() {
  const port = Number(process.env.SMTP_PORT);
  return {
    configured: resendConfigured() || smtpConfigured(),
    mode: resendConfigured() ? 'resend' : smtpConfigured() ? 'smtp' : localMailFallback ? 'console' : 'missing',
    provider: resendConfigured() ? 'resend' : smtpConfigured() ? 'smtp' : null,
    host: process.env.SMTP_HOST || null,
    port: Number.isFinite(port) ? port : null,
    secure: smtpSecure(),
    from: emailFrom(),
    hasResendKey: resendConfigured(),
    hasUser: Boolean(process.env.SMTP_USER),
    hasPassword: Boolean(process.env.SMTP_PASS)
  };
}

function smtpSecure() {
  if (process.env.SMTP_SECURE === 'true') return true;
  if (process.env.SMTP_SECURE === 'false') return false;
  return Number(process.env.SMTP_PORT) === 465;
}

function createTransport() {
  const auth = process.env.SMTP_USER && process.env.SMTP_PASS
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    : undefined;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: smtpSecure(),
    auth,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000
  });
}

function publicMailError(error) {
  const code = error?.code || error?.command || null;
  const responseCode = error?.responseCode || null;
  let hint = 'Check your SMTP settings in Render.';

  if (responseCode === 535 || String(error?.message || '').includes('Username and Password not accepted')) {
    hint = 'Gmail rejected the login. Use a 16-character Google App Password, not your normal Gmail password.';
  } else if (responseCode === 534) {
    hint = 'Gmail blocked SMTP login. Enable 2-Step Verification and create an App Password.';
  } else if (code === 'ESOCKET' || code === 'ETIMEDOUT') {
    hint = 'Render could not connect to the SMTP server. Check SMTP_HOST, SMTP_PORT, and SMTP_SECURE.';
  }

  return {
    message: error?.message || 'SMTP check failed.',
    code,
    responseCode,
    hint
  };
}

async function verifyEmailTransport() {
  if (resendConfigured()) {
    return {
      ok: true,
      hint: 'Resend is configured and sends over HTTPS, which works on Render free services.'
    };
  }

  if (!smtpConfigured()) {
    return {
      ok: false,
      error: {
        message: 'Email sending is not configured yet.',
        hint: 'Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM in Render.'
      }
    };
  }

  try {
    await createTransport().verify();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: publicMailError(error) };
  }
}

function codeSubject(purpose) {
  return purpose === 'password_reset'
    ? 'Your Cara Mia password reset code'
    : 'Your Cara Mia verification code';
}

function codeText({ code, purpose, accountId }) {
  const action = purpose === 'password_reset'
    ? 'reset your Cara Mia password'
    : 'finish creating your Cara Mia account';
  return [
    `Your Cara Mia code is ${code}.`,
    '',
    `Use it to ${action}${accountId ? ` for ${accountId}` : ''}.`,
    'This code expires in 15 minutes.',
    '',
    'If you did not request this, you can ignore this email.'
  ].join('\n');
}

function codeHtml({ code, purpose, accountId }) {
  const action = purpose === 'password_reset'
    ? 'reset your Cara Mia password'
    : 'finish creating your Cara Mia account';
  return `
    <div style="font-family: Arial, sans-serif; color: #140f18; line-height: 1.5;">
      <h1 style="font-size: 24px; margin: 0 0 12px;">Cara Mia</h1>
      <p style="margin: 0 0 12px;">Use this code to ${action}${accountId ? ` for <strong>${accountId}</strong>` : ''}.</p>
      <p style="font-size: 30px; font-weight: 800; letter-spacing: 6px; margin: 0 0 12px;">${code}</p>
      <p style="margin: 0;">This code expires in 15 minutes. If you did not request this, you can ignore this email.</p>
    </div>
  `;
}

async function sendAuthCode({ to, code, purpose, accountId }) {
  if (resendConfigured()) {
    let response;
    try {
      response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify({
          from: emailFrom(),
          to,
          subject: codeSubject(purpose),
          text: codeText({ code, purpose, accountId }),
          html: codeHtml({ code, purpose, accountId })
        })
      });
    } catch (error) {
      const next = new Error(`Resend email request failed. ${error.message} Check RESEND_API_KEY and EMAIL_FROM in Render.`);
      next.statusCode = 502;
      throw next;
    }

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      const message = payload.message || payload.error || `Resend returned HTTP ${response.status}.`;
      const next = new Error(`${message} Check RESEND_API_KEY and EMAIL_FROM in Render.`);
      next.statusCode = 502;
      throw next;
    }
    return { mode: 'resend' };
  }

  if (!smtpConfigured()) {
    if (localMailFallback) {
      console.log(`[Cara Mia] ${purpose} code for ${to}${accountId ? ` (${accountId})` : ''}: ${code}`);
      return { mode: 'console' };
    }

    const error = new Error('Email sending is not configured yet. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM in Render.');
    error.statusCode = 503;
    throw error;
  }

  const transport = createTransport();
  try {
    await transport.sendMail({
      from: emailFrom(),
      to,
      subject: codeSubject(purpose),
      text: codeText({ code, purpose, accountId }),
      html: codeHtml({ code, purpose, accountId })
    });
  } catch (error) {
    const publicError = publicMailError(error);
    const next = new Error(`${publicError.message} ${publicError.hint}`);
    next.statusCode = 502;
    throw next;
  }
  return { mode: 'smtp' };
}

module.exports = {
  emailConfigStatus,
  sendAuthCode,
  verifyEmailTransport
};
