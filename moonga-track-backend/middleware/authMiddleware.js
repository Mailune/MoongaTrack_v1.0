const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const checkUser = (req, res, next) => {
    // Vérifier la présence du cookie JWT
    const token = req.cookies ? req.cookies.jwt : null;
    console.log("Middleware checkUser - Token JWT reçu:", token);

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log("Erreur de vérification JWT:", err.message);
                // Si le token est invalide, on supprime le cookie
                res.cookie('jwt', '', { maxAge: 1 });
                res.locals.user = null;
                next();
            } else {
                try {
                    const user = await UserModel.findById(decodedToken.id);
                    res.locals.user = user ? user : null;
                    console.log("Utilisateur trouvé dans checkUser:", user ? user.username : "Aucun utilisateur");
                    next();
                } catch (dbError) {
                    console.log("Erreur de base de données lors de la recherche de l'utilisateur:", dbError.message);
                    res.locals.user = null;
                    next();
                }
            }
        });
    } else {
        console.log("Aucun token JWT trouvé dans les cookies.");
        res.locals.user = null;
        next();
    }
};

const requireAuth = (req, res, next) => {
    if (!res.locals.user) {
        return res.status(401).json({ message: 'Unauthorized: Please log in' });
    }
    next();
};

module.exports = { checkUser, requireAuth };
