const mongoose = require('mongoose');

const ProgressLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  isCorrect: { type: Boolean, required: true },
  timeSpent: { type: Number }, // in seconds
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProgressLog', ProgressLogSchema);
