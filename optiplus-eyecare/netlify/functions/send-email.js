const nodemailer = require('nodemailer');

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
  debug: true
});

const generateInternalEmail = (bookingData) => `
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .section { margin-bottom: 20px; padding: 15px; background: #f9fafb; border-radius: 8px; }
        .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 8px; border: 1px solid #ddd; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>New Appointment Booking</h2>
        <p>Reference: ${bookingData.bookingNumber}</p>
      </div>

      <div class="section">
        <h3>Client Information</h3>
        <table>
          <tr>
            <td><strong>Name:</strong></td>
            <td>${bookingData.firstName} ${bookingData.lastName}</td>
          </tr>
          <tr>
            <td><strong>Phone:</strong></td>
            <td>${bookingData.phone}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>${bookingData.email}</td>
          </tr>
        </table>
      </div>

      <div class="section">
        <h3>Appointment Details</h3>
        <table>
          <tr>
            <td><strong>Service:</strong></td>
            <td>${bookingData.service}</td>
          </tr>
          <tr>
            <td><strong>Date:</strong></td>
            <td>${bookingData.date}</td>
          </tr>
          <tr>
            <td><strong>Time:</strong></td>
            <td>${bookingData.time}</td>
          </tr>
          <tr>
            <td><strong>Location:</strong></td>
            <td>${bookingData.location}</td>
          </tr>
        </table>
      </div>

      ${bookingData.notes ? `
        <div class="section">
          <h3>Additional Notes</h3>
          <p>${bookingData.notes}</p>
        </div>
      ` : ''}

      <div class="section">
        <h3>Follow-up Actions</h3>
        <ul>
          <li>Call client to confirm appointment</li>
          <li>Send reminder 24 hours before appointment</li>
          <li>Prepare client file/records</li>
        </ul>
      </div>
    </body>
  </html>
`;

exports.handler = async (event, context) => {
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
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { bookingData } = JSON.parse(event.body);
    console.log('Processing booking:', bookingData);

    // Send internal record email
    await transporter.sendMail({
      from: '"OptiPlus Booking System" <appointments@optiplus.co.ke>',
      to: 'appointments@optiplus.co.ke',
      subject: `New Booking: ${bookingData.firstName} ${bookingData.lastName} - ${bookingData.bookingNumber}`,
      html: generateInternalEmail(bookingData),
      headers: {
        'X-Booking-Reference': bookingData.bookingNumber,
        'X-Client-Phone': bookingData.phone,
        'X-Appointment-Date': bookingData.date
      }
    });

    // Send client confirmation email (your existing email template)
    const clientEmailContent = `
      <!-- Your existing client email template -->
    `;

    await transporter.sendMail({
      from: '"OptiPlus Appointments" <appointments@optiplus.co.ke>',
      to: bookingData.email,
      subject: 'OptiPlus - Your Appointment Confirmation',
      html: clientEmailContent,
      headers: {
        'X-Booking-Reference': bookingData.bookingNumber
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Booking processed successfully'
      })
    };
  } catch (error) {
    console.error('Booking processing failed:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Failed to process booking',
        details: error.message
      })
    };
  }
};