/**
 * Main export file for SSR server services
 * Provides easy access to all interfaces and services
 */

// Interfaces
export type { IDomainDetector } from './interfaces/IDomainDetector';
export type { IConfigService } from './interfaces/IConfigService';
export type { IPageTransformer } from './interfaces/IPageTransformer';
export type { IMessageConsumer } from './interfaces/IMessageConsumer';

// Services
export type { DomainDetectorService } from './services/DomainDetectorService';
export type { ConfigService } from './services/ConfigService';
export type { PageTransformerService } from './services/PageTransformerService';
export type { RabbitMQConsumerService } from './services/RabbitMQConsumerService';
export type { ServiceContainer } from './services/ServiceContainer';

// Config
export { config } from './config/environment';
export type { ServerConfig } from './config/environment';

