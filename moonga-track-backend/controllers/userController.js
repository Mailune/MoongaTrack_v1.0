const User = require('../models/User');
const RecommendationModel = require('../models/Recommendation'); // Modèle fictif pour les recommandations
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Endpoint pour obtenir des recommandations en fonction des préférences utilisateur
exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { genre, theme } = user.preferences; // Récupère les préférences

    // Logique de filtrage des recommandations en fonction des préférences
    const recommendations = await RecommendationModel.find({
      genre: genre,
      theme: theme,
    });

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des recommandations" });
  }
};
