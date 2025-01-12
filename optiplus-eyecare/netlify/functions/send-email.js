const nodemailer = require('nodemailer');

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
  // Enable CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: 'Method Not Allowed',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  try {
    const { bookingData } = JSON.parse(event.body);
    
    const emailTemplate = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .booking-details { background: #f3f4f6; padding: 20px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Confirmation</h1>
            </div>

            <p>Dear ${bookingData.firstName} ${bookingData.lastName},</p>
            
            <div class="booking-details">
              <p><strong>Booking Number:</strong> ${bookingData.bookingNumber}</p>
              <p><strong>Service:</strong> ${bookingData.service}</p>
              <p><strong>Date:</strong> ${bookingData.date}</p>
              <p><strong>Time:</strong> ${bookingData.time}</p>
              <p><strong>Location:</strong> ${bookingData.location}</p>
            </div>

            <p><strong>Important:</strong></p>
            <ul>
              <li>Please arrive 10 minutes before your appointment</li>
              <li>Bring any current eyewear or prescriptions</li>
              <li>If you need to reschedule, please call 24 hours in advance</li>
            </ul>

            <p>Contact us at:</p>
            <p>Phone: +254 702 220 545</p>
            <p>Email: info@optiplus.co.ke</p>

            <p>Thank you for choosing OptiPlus!</p>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.VITE_MAIL_FROM,
      to: bookingData.email,
      subject: 'OptiPlus - Appointment Confirmation',
      html: emailTemplate
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        message: 'Email sent successfully', 
        id: info.messageId 
      })
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        message: 'Failed to send email', 
        error: error.message 
      })
    };
  }
};