const express = require('express');
const router = express.Router();
const ProgressLog = require('../models/ProgressLog');

// Log an answer/interaction and get AI Recommendation
router.post('/', async (req, res) => {
  try {
    const { userId, lessonId, isCorrect, timeSpent, topic, difficulty } = req.body;
    
    // 1. Log to database (Mocked/Disabled for local demo if MongoDB isn't running)
    // const log = new ProgressLog({ userId, lessonId, isCorrect, timeSpent });
    // await log.save();
    
    // 2. Forward to Python Machine Learning Microservice
    const aiResponse = await fetch('http://127.0.0.1:8000/analyze_progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId || 'demo-user',
        topic: topic || 'derivatives',
        difficulty: difficulty || 0.5,
        is_correct: isCorrect,
        time_spent_seconds: timeSpent || 15
      })
    });
    
    const aiData = await aiResponse.json();

    // 3. Return the AI Analysis to the frontend
    res.status(201).json({
      db_status: 'skipped_for_demo',
      ai_analysis: aiData
    });
  } catch (err) {
    res.status(500).json({ message: 'Error communicating with AI Service: ' + err.message });
  }
});

// Get progress for a user
router.get('/:userId', async (req, res) => {
  try {
    const logs = await ProgressLog.find({ userId: req.params.userId }).populate('lessonId');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
