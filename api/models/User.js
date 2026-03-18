const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['student', 'instructor'], default: 'student' },
  knowledgeState: {
    type: Map,
    of: Number,
    default: {} // e.g., {"algebra": 0.6, "geometry": 0.4}
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
