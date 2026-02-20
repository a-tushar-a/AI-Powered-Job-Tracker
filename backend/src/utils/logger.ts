import winston from 'winston';
import path from 'path';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.resolve(__dirname, '../../logs/error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.resolve(__dirname, '../../logs/combined.log') }),
  ],
});

export default logger;
