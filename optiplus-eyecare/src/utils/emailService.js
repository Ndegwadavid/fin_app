import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: import.meta.env.VITE_SMTP_HOST,
  port: import.meta.env.VITE_SMTP_PORT,
  secure: true, // true for port 465
  auth: {
    user: import.meta.env.VITE_SMTP_USER,
    pass: import.meta.env.VITE_SMTP_PASS,
  },
});

export const sendBookingConfirmation = async (bookingData) => {
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
    from: import.meta.env.VITE_MAIL_FROM,
    to: bookingData.email,
    subject: 'OptiPlus - Appointment Confirmation',
    html: emailTemplate
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};