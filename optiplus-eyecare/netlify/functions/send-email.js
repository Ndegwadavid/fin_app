const nodemailer = require('nodemailer');

// Create reusable transporter object
const transporter = nodemailer.createTransport({
  host: 'mail.optiplus.co.ke',
  port: 465,
  secure: true,
  auth: {
    user: 'appointments@optiplus.co.ke',
    pass: 'appointments@optiplus2025'
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true // Enable debug logs
});

exports.handler = async (event, context) => {
  // Log request details
  console.log('Function invoked with body:', event.body);

  // Handle CORS preflight
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

  // Only allow POST method
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the incoming data
    const { bookingData } = JSON.parse(event.body);
    console.log('Parsed booking data:', bookingData);

    // Create email content
    const emailContent = `
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

            <p><strong>Important Notes:</strong></p>
            <ul>
              <li>Please arrive 10 minutes before your appointment time</li>
              <li>Bring any current eyewear or prescriptions</li>
              <li>If you need to reschedule, please call 24 hours in advance</li>
            </ul>

            <p><strong>Contact Us:</strong></p>
            <p>Phone: +254 702 220 545</p>
            <p>Email: info@optiplus.co.ke</p>

            <p>Thank you for choosing OptiPlus!</p>
          </div>
        </body>
      </html>
    `;

    // Send the email
    const info = await transporter.sendMail({
      from: '"OptiPlus Appointments" <appointments@optiplus.co.ke>',
      to: bookingData.email,
      subject: 'OptiPlus - Appointment Confirmation',
      html: emailContent
    });

    console.log('Email sent successfully:', info);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Email sent successfully',
        messageId: info.messageId
      })
    };
  } catch (error) {
    console.error('Error details:', error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Failed to send email',
        details: error.message,
        stack: error.stack
      })
    };
  }
};