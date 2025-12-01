import * as amqp from 'amqplib';
import { IMessageConsumer } from '../interfaces/IMessageConsumer';

/**
 * Service for consuming messages from RabbitMQ
 * Follows Single Responsibility Principle - only handles message consumption
 * Follows Open/Closed Principle - can be extended with different message handlers
 */
export class RabbitMQConsumerService implements IMessageConsumer {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private running: boolean = false;

  constructor(
    private rabbitmqUrl: string,
    private queueName: string,
    private messageHandler: (message: any) => Promise<void>
  ) {}

  /**
   * Starts the RabbitMQ consumer
   */
  async start(): Promise<void> {
    // not implemented
  }

  /**
   * Stops the RabbitMQ consumer
   */
  async stop(): Promise<void> {
    // not implemented
  }

  /**
   * Gets the consumer status
   */
  isRunning(): boolean {
    return this.running;
  }
}
