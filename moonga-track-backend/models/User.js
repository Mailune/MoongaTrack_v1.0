const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Le nom d’utilisateur est requis.'],
    unique: true,
    minlength: [3, 'Le nom d’utilisateur doit comporter au moins 3 caractères.'],
  },
  email: {
    type: String,
    required: [true, 'L’email est requis.'],
    unique: true,
    match: [/.+\@.+\..+/, 'Format d’email invalide.'],
  },
  password_hash: {
    type: String,
    required: [true, 'Le mot de passe est requis.'],
  },
  validationCode: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  resetCode: {
    type: String,
    default: null,
  },
  resetCodeExpiration: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// Méthode pour se connecter
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password_hash); // Comparer les mots de passe
    if (auth) return user; // Si l'authentification réussit, retourner l'utilisateur
    throw Error('Mot de passe incorrect');
  }
  throw Error('Email inconnu');
};

module.exports = mongoose.model('User', userSchema);
