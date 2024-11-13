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
  validationCode: String,
  isActive: { type: Boolean, default: false },
  resetCode: { type: String, default: null },
  resetCodeExpiration: { type: Date, default: null },
  // liste de suivis
  animeList: [
    {
      animeId: { type: String, required: true },
      status: { type: String, enum: ['watching', 'completed', 'planned'], default: 'planned' },
      rating: { type: Number, min: 0, max: 10 },
      comment: { type: String }
    }
  ],
  // favoris
  favorites: [{ type: String }], // Liste des favoris d'anime/manga
  // préférences utilisateur
  preferences: {
    favoriteGenres: [String],
    favoriteThemes: [String],
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
