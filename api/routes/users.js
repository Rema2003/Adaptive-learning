const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register or mock login (simplified for prototype)
router.post('/register', async (req, res) => {
  try {
    const { email, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, role });
      await user.save();
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
