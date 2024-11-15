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

/**
 * Public Authentication Routes
 */
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/verify', verifyUser);
router.post('/reset-password-request', resetPasswordRequest);
router.post('/reset-password', resetPassword);

/**
 * Real-time Validation Routes
 */
router.post('/check-username', checkUsername);
router.post('/check-email', checkEmail);

/**
 * Middleware to Validate JWT for Subsequent Routes
 */
router.use(checkUser);

/**
 * Authenticated Routes
 */
router.get('/checkAuth', requireAuth, (req, res) => {
    res.status(200).json({ message: 'User is authenticated', user: res.locals.user });
});

router.post('/logout', requireAuth, logout);

module.exports = router;
