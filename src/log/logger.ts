import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format((info) => {
          const newInfo = info;
          newInfo.level = info.level.toUpperCase().padEnd(7, ' ');
          return newInfo;
        })(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize({ all: true })
      ),
    }),
  ],
});

export default logger;
