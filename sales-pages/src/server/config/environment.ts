/**
 * Environment configuration
 * Centralized configuration following Single Responsibility Principle
 */
export interface ServerConfig {
  port: number;
  apiBaseUrl: string;
  rabbitmq: {
    url: string;
    queue: string;
  };
}

export const config: ServerConfig = {
  port: parseInt(process.env['PORT'] || '4000', 10),
  apiBaseUrl: process.env['API_BASE_URL'] || 'http://localhost:3000',
  rabbitmq: {
    url: process.env['RABBITMQ_URL'] || 'amqp://localhost',
    queue: process.env['RABBITMQ_QUEUE'] || 'page-updates',
  },
};
