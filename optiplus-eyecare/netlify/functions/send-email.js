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

// Template for internal staff email
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

// Template for client confirmation email
const generateClientEmail = (bookingData) => `
  <html>
    <head>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px;
        }
        .header { 
          background: #2563eb; 
          color: white; 
          padding: 30px 20px; 
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .booking-details { 
          background: #f3f4f6; 
          padding: 20px; 
          margin: 20px 0;
          border-radius: 8px;
        }
        .contact-info {
          background: #e8f0fe;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
        }
        .important-notes {
          background: #fff4ed;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
        }
        .footer {
          background: #f8fafc;
          padding: 20px;
          text-align: center;
          border-radius: 0 0 8px 8px;
          margin-top: 20px;
        }
        h2 {
          color: #2563eb;
          margin-bottom: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Appointment Confirmation</h1>
          <p style="font-size: 1.1em;">Thank you for choosing OptiPlus for your eye care needs!</p>
        </div>

        <p style="font-size: 1.1em; margin: 20px 0;">Dear ${bookingData.firstName} ${bookingData.lastName},</p>
        
        <p>We're delighted to confirm your appointment with OptiPlus. Here are your booking details:</p>
        
        <div class="booking-details">
          <h2>Appointment Details</h2>
          <p><strong>Booking Reference:</strong> ${bookingData.bookingNumber}</p>
          <p><strong>Service:</strong> ${bookingData.service}</p>
          <p><strong>Date:</strong> ${bookingData.date}</p>
          <p><strong>Time:</strong> ${bookingData.time}</p>
          <p><strong>Location:</strong> ${bookingData.location}</p>
        </div>

        <div class="contact-info">
          <h2>Your Contact Information</h2>
          <p><strong>Phone:</strong> ${bookingData.phone}</p>
          <p><strong>Email:</strong> ${bookingData.email}</p>
          <p style="margin-top: 15px;">Our team will reach out to you through these contact details to confirm your appointment and answer any questions you might have.</p>
        </div>

        <div class="important-notes">
          <h2>Important Information</h2>
          <ul>
            <li>Please arrive 10 minutes before your scheduled appointment time</li>
            <li>Remember to bring any current eyewear or prescriptions you have</li>
            <li>If you need to reschedule, please call us at least 24 hours in advance</li>
            <li>In case you wear contact lenses, please bring them along</li>
            <li>The appointment duration may vary based on the type of examination needed</li>
          </ul>
        </div>

        <div class="contact-info">
          <h2>Need to Reach Us?</h2>
          <p><strong>Phone:</strong> +254 702 220 545 | +254 105 165 560</p>
          <p><strong>Email:</strong> info@optiplus.co.ke</p>
          <p><strong>Operating Hours:</strong></p>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 9:00 AM - 4:00 PM</p>
          <p>Closed on Sundays & Public Holidays</p>
        </div>

        <div class="footer">
          <p>Thank you for trusting OptiPlus with your eye care needs. We look forward to serving you!</p>
          <p style="color: #666; font-size: 0.9em;">Please keep this email for your records.</p>
        </div>
      </div>
    </body>
  </html>
`;

exports.handler = async (event, context) => {
  // CORS handling
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

    // Send email to client
    await transporter.sendMail({
      from: '"OptiPlus Appointments" <appointments@optiplus.co.ke>',
      to: bookingData.email,
      subject: 'OptiPlus - Your Appointment Confirmation',
      html: generateClientEmail(bookingData),
      headers: {
        'X-Booking-Reference': bookingData.bookingNumber
      }
    });

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