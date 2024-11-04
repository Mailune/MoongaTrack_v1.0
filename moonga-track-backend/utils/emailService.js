const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Utilise le service email de ton choix (ex: Gmail, Mailgun, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Ton adresse email (via une variable d'environnement)
    pass: process.env.EMAIL_PASSWORD, // Mot de passe ou clé API pour l'email
  },
});

const sendValidationEmail = (email, validationCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Adresse email de l'expéditeur
    to: email, // Destinataire
    subject: 'Validation de votre inscription',
    text: `Voici votre code de validation : ${validationCode}`,
    html: `<p>Voici votre code de validation : <strong>${validationCode}</strong></p>`, // Optionnel : version HTML du message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendValidationEmail;
