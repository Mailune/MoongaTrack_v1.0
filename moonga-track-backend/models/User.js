const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    match: [/.+\@.+\..+/, 'Invalid email format.'],
  },
  password_hash: {
    type: String,
    required: [true, 'Password is required.'],
  },
  validationCode: {
    type: String,
    default: null,
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
  animeList: [
    {
      animeId: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['watching', 'completed', 'planned'],
        default: 'planned',
      },
      rating: {
        type: Number,
        min: 0,
        max: 10,
      },
      comment: {
        type: String,
      },
    },
  ],
  favorites: [{
    type: String,
  }],
  preferences: {
    favoriteGenres: {
      type: [String],
      default: [],
    },
    favoriteThemes: {
      type: [String],
      default: [],
    },
  },
}, { timestamps: true });

/**
 * Pre-save hook to hash passwords before saving
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password_hash')) return next();
  try {
    this.password_hash = await bcrypt.hash(this.password_hash, 10);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);