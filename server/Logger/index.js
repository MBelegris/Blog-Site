const {format, createLogger, transports} = require('winston');
const {timestamp, combine, printf} = format;

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
            filename: './Logger/logs.log'
        })
    ]
});

module.exports= logger;