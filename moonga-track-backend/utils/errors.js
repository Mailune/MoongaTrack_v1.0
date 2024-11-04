
// Fonction pour gérer les erreurs d'inscription
const signUpErrors = (error) => {
    let errors = { username: '', email: '', password: '' };

    // Erreurs MongoDB pour les champs uniques (code 11000)
    if (error.code === 11000) {
        if (error.keyValue.email) {
            errors.email = 'Cet email est déjà utilisé.';
        }
        if (error.keyValue.username) {
            errors.username = 'Ce nom d’utilisateur est déjà pris.';
        }
    }

    // Erreurs de validation Mongoose
    if (error.errors) {
        if (error.errors.username) {
            errors.username = error.errors.username.message;
        }
        if (error.errors.email) {
            errors.email = error.errors.email.message;
        }
        if (error.errors.password) {
            errors.password = 'Le mot de passe doit contenir au moins 8 caractères avec des lettres majuscules, minuscules, chiffres, et caractères spéciaux.';
        }
    }

    return errors;
};

// Fonction pour gérer les erreurs de connexion
const signInErrors = (error) => {
    let errors = { email: '', password: '' };

    if (error.message.includes('Email inconnu')) {
        errors.email = 'Email inconnu.';
    }
    if (error.message.includes('Mot de passe incorrect')) {
        errors.password = 'Mot de passe incorrect.';
    }

    return errors;
};

module.exports = { signUpErrors, signInErrors };
