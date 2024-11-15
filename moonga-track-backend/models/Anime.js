const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  anilistId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    romaji: {
      type: String,
      required: true,
    },
    english: {
      type: String,
      required: false,
    },
  },
  coverImage: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Anime', animeSchema);
