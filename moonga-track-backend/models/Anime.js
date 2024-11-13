const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  anilistId: Number,
  title: {
    romaji: String,
    english: String,
  },
  coverImage: String,
  genres: [String],
});

module.exports = mongoose.model('Anime', animeSchema);
