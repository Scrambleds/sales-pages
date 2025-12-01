import { IDomainDetector } from '../interfaces/IDomainDetector';
import { IConfigService } from '../interfaces/IConfigService';
import { IPageTransformer } from '../interfaces/IPageTransformer';
import { IMessageConsumer } from '../interfaces/IMessageConsumer';
import { DomainDetectorService } from './DomainDetectorService';
import { ConfigService } from './ConfigService';
import { PageTransformerService } from './PageTransformerService';
import { RabbitMQConsumerService } from './RabbitMQConsumerService';
import { ServerConfig } from '../config/environment';

/**
 * Service Container for Dependency Injection
 * Follows Dependency Inversion Principle - components depend on abstractions
 * Follows Single Responsibility Principle - manages service lifecycle
 */
export class ServiceContainer {
  private static instance: ServiceContainer;

  public readonly domainDetector: IDomainDetector;
  public readonly configService: IConfigService;
  public readonly pageTransformer: IPageTransformer;
  public readonly messageConsumer: IMessageConsumer;

  private constructor(config: ServerConfig) {
    // Initialize all services
    this.domainDetector = new DomainDetectorService();
    this.configService = new ConfigService(config.apiBaseUrl);
    this.pageTransformer = new PageTransformerService();

    // Create message handler that can access configService
    const messageHandler = async (message: any) => {
      console.log('[ServiceContainer] Processing message:', message);

      // Example: Clear cache when page is updated
      if (message.type === 'page-updated' && message.domain) {
        (this.configService as ConfigService).clearCache(message.domain);
        console.log(`[ServiceContainer] Cache cleared for domain: ${message.domain}`);
      }

      // Add your custom message handling logic here
    };

    this.messageConsumer = new RabbitMQConsumerService(
      config.rabbitmq.url,
      config.rabbitmq.queue,
      messageHandler
    );
  }

  /**
   * Gets or creates the singleton instance
   * Ensures only one instance exists (Singleton pattern)
   */
  static getInstance(config: ServerConfig): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer(config);
    }
    return ServiceContainer.instance;
  }

  /**
   * Initializes background services
   */
  async initialize(): Promise<void> {
    try {
      await this.messageConsumer.start();
      console.log('[ServiceContainer] All background services started');
    } catch (error) {
      console.error('[ServiceContainer] Failed to initialize services:', error);
      // Don't throw - allow server to start even if RabbitMQ is unavailable
    }
  }

  /**
   * Cleanup method for graceful shutdown
   */
  async cleanup(): Promise<void> {
    try {
      await this.messageConsumer.stop();
      console.log('[ServiceContainer] All services stopped');
    } catch (error) {
      console.error('[ServiceContainer] Error during cleanup:', error);
    }
  }
}
