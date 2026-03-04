const nodemailer = require('nodemailer');

const USER_EMAIL = 'sales@atsasci.com';
const USER_PASS = '$Almantahir17';
const SMTP_HOST = 'smtp.office365.com';
const SMTP_PORT = 587;

async function testSend() {
  const targetEmail = 'abdullah60902@gmail.com'; // Testing with repo owner's likely email or a common one
  console.log('Attempting to send real test email to:', targetEmail);
  
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, 
    auth: {
      user: USER_EMAIL,
      pass: USER_PASS,
    },
    tls: {
      ciphers: 'SSLv3', 
      rejectUnauthorized: false
    },
    debug: true, // Enable debug
    logger: true // Enable logger
  });

  try {
    const info = await transporter.sendMail({
      from: USER_EMAIL, // Simple from address
      to: targetEmail,
      subject: "ATSAS SMTP Delivery Test",
      text: "This is a test email to verify delivery from the Admin Panel.",
      html: "<b>This is a test email to verify delivery from the Admin Panel.</b>"
    });
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
  } catch (error) {
    console.error('❌ Send FAILED:', error);
  }
}

testSend();
