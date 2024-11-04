const express = require('express');
const {
    signUp,
    signIn,
    verifyUser,
    logout,
    resetPasswordRequest,
    resetPassword,
    checkUsername,
    checkEmail
} = require('../controllers/authController');
const { checkUser, requireAuth } = require('../middleware/authMiddleware');
const router = express.Router();

// Routes publiques
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/verify', verifyUser);
router.post('/reset-password-request', resetPasswordRequest);
router.post('/reset-password', resetPassword);

// Vérifications en temps réel pour l'unicité des informations
router.post('/check-username', checkUsername);
router.post('/check-email', checkEmail);

// Middleware pour vérifier le token JWT sur toutes les routes suivantes
router.use(checkUser);

// Route de vérification d'authentification
router.get('/checkAuth', requireAuth, (req, res) => {
    res.status(200).json({ message: 'User is authenticated', user: res.locals.user });
});

// Route de déconnexion
router.post('/logout', requireAuth, logout);

module.exports = router;
