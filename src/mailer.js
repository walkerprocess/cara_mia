const nodemailer = require('nodemailer');

const localMailFallback = process.env.NODE_ENV !== 'production';

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_PORT && (process.env.SMTP_FROM || process.env.SMTP_USER));
}

function emailConfigStatus() {
  return {
    configured: smtpConfigured(),
    mode: smtpConfigured() ? 'smtp' : localMailFallback ? 'console' : 'missing',
    host: process.env.SMTP_HOST || null,
    from: process.env.SMTP_FROM || process.env.SMTP_USER || null
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
    auth
  });
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
  await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject: codeSubject(purpose),
    text: codeText({ code, purpose, accountId }),
    html: codeHtml({ code, purpose, accountId })
  });
  return { mode: 'smtp' };
}

module.exports = {
  emailConfigStatus,
  sendAuthCode
};
