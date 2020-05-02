import winston from "winston";
const { format, transports } = winston
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.splat(),
        format.json()
      ),
    })
  ]
});

export default logger;