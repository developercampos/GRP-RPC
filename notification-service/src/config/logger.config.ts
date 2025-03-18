import { LoggerOptions } from 'winston';
import * as winston from 'winston';

/**
 * Configuração do logger Winston para logs estruturados
 * Utiliza formato JSON para facilitar a análise por ferramentas como ELK Stack
 */
export const loggerConfig: LoggerOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.json(),
      ),
    }),
    // Adicione mais transportes conforme necessário:
    // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
  // Configuração padrão de nível de log
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
};