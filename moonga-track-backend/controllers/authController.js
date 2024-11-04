const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User');
const { signUpErrors, signInErrors } = require('../utils/errors');
const sendValidationEmail = require('../utils/emailService');
const sendResetPasswordEmail = require('../utils/resetPasswordEmailService'); // Pour les emails de réinitialisation

// Générer un JWT avec rôle et expiration
const createToken = (id, role, expiresIn = '1h') => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn });
};

// Générer un code de validation de 6 chiffres
const generateValidationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Générer un code de réinitialisation de mot de passe de 6 chiffres
const generateResetCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Valider la complexité du mot de passe
const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

// Vérifier la disponibilité du nom d'utilisateur
const checkUsername = async (req, res) => {
    const { username } = req.body;
    try {
        const userExists = await UserModel.findOne({ username });
        res.json({ exists: !!userExists });
    } catch (error) {
        console.error("Erreur lors de la vérification du nom d'utilisateur:", error);
        res.status(500).json({ message: 'Erreur de vérification' });
    }
};

// Vérifier la disponibilité de l'email
const checkEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const emailExists = await UserModel.findOne({ email });
        res.json({ exists: !!emailExists });
    } catch (error) {
        console.error("Erreur lors de la vérification de l'email:", error);
        res.status(500).json({ message: 'Erreur de vérification' });
    }
};

// Vérifier la force du mot de passe
const checkPasswordStrength = (password) => {
    if (password.length < 8) return 'faible';
    if (password.length >= 8 && password.length < 12) return 'moyen';
    if (password.length >= 12) return 'fort';
};

// Inscription
const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    if (!validatePassword(password)) {
        return res.status(400).json({
            errors: { password: 'Le mot de passe doit comporter au moins 8 caractères avec des lettres majuscules, minuscules, chiffres et caractères spéciaux.' }
        });
    }

    try {
        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) return res.status(400).json({ errors: { username: 'Ce nom d’utilisateur est déjà pris.' } });

        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) return res.status(400).json({ errors: { email: 'Cet email est déjà utilisé.' } });

        const password_hash = await bcrypt.hash(password, 10);
        const validationCode = generateValidationCode();

        const newUser = await UserModel.create({ username, email, password_hash, validationCode, role: 'user', isActive: false });
        sendValidationEmail(email, validationCode);
        res.status(201).json({ message: 'Un email de validation a été envoyé.' });
    } catch (error) {
        console.error("Erreur dans signUp:", error);
        res.status(500).json({ errors: { general: 'Erreur serveur, veuillez réessayer plus tard.' } });
    }
};

// Connexion
const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: { message: 'Email inconnu' } });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(400).json({ errors: { message: 'Mot de passe incorrect' } });
        }

        const token = createToken(user._id, user.role);
        res.cookie('jwt', token, { httpOnly: true, secure: false, sameSite: 'None', maxAge: 3600000 });
        res.status(200).json({ message: 'Connexion réussie', user });
    } catch (error) {
        console.error("Erreur dans signIn:", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Vérification de l'utilisateur
const verifyUser = async (req, res) => {
    const { email, validationCode } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

        if (user.validationCode === validationCode) {
            user.isActive = true;
            user.validationCode = null;
            await user.save();

            const token = createToken(user._id, user.role);
            res.cookie('jwt', token, { httpOnly: true, secure: false, sameSite: 'None', maxAge: 3600000 });
            res.status(200).json({ message: 'Inscription validée avec succès.', token });
        } else {
            res.status(400).json({ message: 'Code de validation incorrect' });
        }
    } catch (error) {
        console.error("Erreur dans verifyUser:", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Demande de réinitialisation du mot de passe
const resetPasswordRequest = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email non trouvé" });

        const resetCode = generateResetCode();
        user.resetCode = resetCode;
        user.resetCodeExpiration = Date.now() + 15 * 60 * 1000; // Code valide pour 15 minutes
        await user.save();

        await sendResetPasswordEmail(email, resetCode);
        res.status(200).json({ message: "Code de réinitialisation envoyé par e-mail." });
    } catch (error) {
        console.error("Erreur dans requestPasswordReset:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Réinitialiser le mot de passe
const resetPassword = async (req, res) => {
    const { email, resetCode, newPassword } = req.body;

    try {
        const user = await UserModel.findOne({ email, resetCode });
        if (!user) return res.status(404).json({ message: "Utilisateur ou code incorrect" });
        
        if (user.resetCodeExpiration < Date.now()) {
            return res.status(400).json({ message: "Code expiré, demandez un nouveau code." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password_hash = hashedPassword;
        user.resetCode = null;
        user.resetCodeExpiration = null;
        await user.save();

        res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
    } catch (error) {
        console.error("Erreur dans resetPassword:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Déconnexion
const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'Déconnexion réussie' });
};

module.exports = {
    signUp,
    signIn,
    verifyUser,
    logout,
    resetPasswordRequest,
    resetPassword,
    checkUsername,
    checkEmail,
    checkPasswordStrength
};
