const {format, createLogger, transports} = require('winston');
const {timestamp, combine, printf} = format;

// Format timestamp: level: message
const logFormat = printf(({timestamp, level, message}) => {
    return `${timestamp}: ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        logFormat,
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: './Logger/logs.log' // Logs also are saved in logs.log
        })
    ]
});

module.exports= logger;