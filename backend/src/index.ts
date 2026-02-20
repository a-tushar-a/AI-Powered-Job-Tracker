import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';
import answerFeedbackRoutes from './routes/answerFeedback.routes';
import { errorHandlingMiddleware } from './middleware/error.middleware';
import logger from './utils/logger';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Swagger Documentation
const swaggerSpec = YAML.load(path.resolve(__dirname, './swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/answers', answerFeedbackRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('AI Job Tracker Backend API');
});

// Error Handling Middleware
app.use(errorHandlingMiddleware);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
