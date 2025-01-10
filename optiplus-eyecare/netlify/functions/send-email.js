import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.VITE_SMTP_HOST,
  port: process.env.VITE_SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.VITE_SMTP_USER,
    pass: process.env.VITE_SMTP_PASS,
  },
});

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { bookingData } = JSON.parse(event.body);
    
    const info = await transporter.sendMail({
      from: process.env.VITE_MAIL_FROM,
      to: bookingData.email,
      subject: 'OptiKenya - Appointment Confirmation',
      html: generateEmailTemplate(bookingData)
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully', id: info.messageId })
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email', error: error.message })
    };
  }
};

function generateEmailTemplate(bookingData) {
  return `
    <html>
      <!-- Same email template as above -->
    </html>
  `;
}