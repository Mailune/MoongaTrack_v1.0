const nodemailer = require('nodemailer');

/**
 * Create a Nodemailer transporter using environment variables for credentials
 */
const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your desired email service
    auth: {
        user: process.env.EMAIL_USER, // Sender's email from environment variables
        pass: process.env.EMAIL_PASSWORD, // Email password or API key
    },
});

/**
 * Send a reset password email to the user
 * @param {string} toEmail - Recipient's email address
 * @param {string} resetCode - The reset code to include in the email
 */
const sendResetPasswordEmail = async (toEmail, resetCode) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email address
        to: toEmail, // Recipient's email address
        subject: 'Password Reset Code',
        html: `
            <h2>Password Reset Code</h2>
            <p>Use this code to reset your password:</p>
            <h3>${resetCode}</h3>
            <p>This code will expire in 15 minutes.</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Reset password email sent to ${toEmail}`);
    } catch (error) {
        console.error('Error sending reset password email:', error);
        throw new Error('Failed to send reset password email.');
    }
};

module.exports = sendResetPasswordEmail;
