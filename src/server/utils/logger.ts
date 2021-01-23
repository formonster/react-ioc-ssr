import log4js from "log4js";

// TODO 将错误日志放到单独的文件中
log4js.configure({
    appenders: { cheese: { type: 'file', filename: './log/app.log' } },
    categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
const logger = log4js.getLogger('cheese');

// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Comté.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');

export default logger;