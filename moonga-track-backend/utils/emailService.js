const nodemailer = require('nodemailer');

/**
 * Create a Nodemailer transporter using environment variables for credentials
 */
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with the desired email service (e.g., Gmail, Mailgun, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Sender's email from environment variables
    pass: process.env.EMAIL_PASSWORD, // Email password or API key
  },
});

/**
 * Send a validation email to the user
 * @param {string} email - Recipient's email address
 * @param {string} validationCode - The validation code to include in the email
 */
const sendValidationEmail = (email, validationCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: email, // Recipient's email address
    subject: 'Account Validation',
    text: `Here is your validation code: ${validationCode}`,
    html: `<p>Here is your validation code: <strong>${validationCode}</strong></p>`, // HTML version of the message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Validation email sent:', info.response);
    }
  });
};

module.exports = sendValidationEmail;
