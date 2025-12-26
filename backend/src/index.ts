import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
import authRoutes from './routes/auth.routes';
import jobRoutes from './routes/job.routes';
import aiRoutes from './routes/ai.routes';

// Basic route
app.get('/', (req, res) => {
  res.send('AI Powered Job Tracker Backend API');
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/ai', aiRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});