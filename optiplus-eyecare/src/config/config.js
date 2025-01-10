
export const config = {
    smtp: {
      host: import.meta.env.VITE_SMTP_HOST,
      port: import.meta.env.VITE_SMTP_PORT,
      user: import.meta.env.VITE_SMTP_USER,
      pass: import.meta.env.VITE_SMTP_PASS,
      from: import.meta.env.VITE_MAIL_FROM
    }
  };