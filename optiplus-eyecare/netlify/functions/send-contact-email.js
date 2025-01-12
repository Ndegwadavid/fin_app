const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.optiplus.co.ke',
  port: 465,
  secure: true,
  auth: {
    user: 'info@optiplus.co.ke',
    pass: 'nothing tobe placed here sorry' // will be replaced with the correct password
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { contactData } = JSON.parse(event.body);

    const emailContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 20px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            
            <div class="content">
              <h2>Contact Details:</h2>
              <p><strong>Name:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              <p><strong>Phone:</strong> ${contactData.phone}</p>
              
              <h2>Message:</h2>
              <p>${contactData.message}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: '"OptiPlus Contact Form" <info@optiplus.co.ke>',
      to: 'info@optiplus.co.ke',
      subject: 'New Contact Form Submission',
      html: emailContent
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully' })
    };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message' })
    };
  }
};