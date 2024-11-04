const nodemailer = require('nodemailer');

// Configurer le transporteur avec les identifiants de votre service d'e-mail
const transporter = nodemailer.createTransport({
    service: 'gmail',  // ou un autre fournisseur de services de messagerie
    auth: {
        user: process.env.EMAIL_USER,      // renseignez votre adresse e-mail dans les variables d'environnement
        pass: process.env.EMAIL_PASSWORD       // renseignez votre mot de passe de messagerie dans les variables d'environnement
    }
});

// Fonction pour envoyer un e-mail de réinitialisation de mot de passe
const sendResetPasswordEmail = async (toEmail, resetCode) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Votre code de réinitialisation de mot de passe',
        html: `
            <h2>Code de réinitialisation de mot de passe</h2>
            <p>Utilisez ce code pour réinitialiser votre mot de passe :</p>
            <h3>${resetCode}</h3>
            <p>Ce code expirera dans 15 minutes.</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`E-mail de réinitialisation envoyé à ${toEmail}`);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail de réinitialisation:', error);
        throw new Error('Échec de l\'envoi de l\'e-mail de réinitialisation');
    }
};

module.exports = sendResetPasswordEmail;
