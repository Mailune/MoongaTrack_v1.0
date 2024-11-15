const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

/**
 * Middleware to check user authentication and attach user data to res.locals
 */
const checkUser = async (req, res, next) => {
    const token = req.cookies?.jwt;
    
    if (!token) {
        console.log("No JWT token found in cookies.");
        res.locals.user = null;
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decodedToken.id);
        res.locals.user = user || null;
        console.log("User found in checkUser:", user ? user.username : "No user");
    } catch (error) {
        console.error("JWT verification or database error:", error.message);
        res.cookie('jwt', '', { maxAge: 1 }); // Clear invalid token
        res.locals.user = null;
    } finally {
        next();
    }
};

/**
 * Middleware to enforce authentication for protected routes
 */
const requireAuth = (req, res, next) => {
    if (!res.locals.user) {
        return res.status(401).json({ message: 'Unauthorized: Please log in' });
    }
    next();
};

module.exports = { checkUser, requireAuth };
