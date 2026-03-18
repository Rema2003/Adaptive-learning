const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const lessonRoutes = require('./routes/lessons');
const userRoutes = require('./routes/users');
const progressRoutes = require('./routes/progress');

app.use('/api/lessons', lessonRoutes);
app.use('/api/users', userRoutes);
app.use('/api/progress', progressRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'adaptive-learning-api' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
