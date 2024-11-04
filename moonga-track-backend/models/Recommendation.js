const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
