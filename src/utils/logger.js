'use server';

const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const createFormLogger = (formName) => {
  const folderPath = path.join(process.cwd(), 'logs', formName);

  const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: path.join(folderPath, '%DATE%-leads.log'),
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
  });

  return createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(
        ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`
      )
    ),
    transports: [
      dailyRotateFileTransport, 
      new transports.Console(), 
    ],
  });
};

module.exports = createFormLogger;
