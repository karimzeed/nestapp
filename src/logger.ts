import * as winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // Log to the console 
    new winston.transports.File({ filename: 'logs/combined.log' , handleExceptions: true}), // Log to a file
  ],
  levels: winston.config.npm.levels
},);