// createLogger helps create the logger from winston
// format helps it easier for machine and human to read logs
// transports is essentially a storage device for your logs
import { createLogger, format, transports } from "winston";
// DailyRotateFile is also a transport that automatically rotates log files. It prevents log files from becoming excessively large
import DailyRotateFile from "winston-daily-rotate-file";
// file system and path for file directory
import fs from "fs";
import path from "path";

//combine allows the combination of multiple individual formats into a single, cohesive format
//timestamp adds a timestamp to each log message, showing when the log event occurred
//printf function enables the creation of highly customized log message formats using a template string
//colorize format applies color to log levels and or messages
//json formats outputs log messages as JSON objects
//errors formats specifically handle error objects within log messages.
const { combine, timestamp, printf, colorize, json, errors } = format;

const logFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaStr = Object.keys(meta).length ? `${JSON.stringify(meta)}` : "";
  return `[${timestamp}] ${level}: ${message} ${metaStr}`;
});

const consoleFormat = combine(colorize(), timestamp(), logFormat);

const fileFormat = combine(errors({ stack: true }), timestamp(), json());

const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logger = createLogger({
  level: "info",
  //   format: combine(colorize(), timestamp(), logFormat),
  transports: [
    new transports.Console({ format: consoleFormat }),
    new DailyRotateFile({
      filename: path.join(logsDir, "application-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      format: fileFormat,
    }),
    new transports.File({ filename: "log/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(logsDir, "exceptions.log"),
      format: fileFormat,
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: path.join(logsDir, "rejections.log"),
      format: fileFormat,
    }),
  ],
  exitOnError: false,
});

export default logger;
