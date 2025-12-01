/**
 * Interface for message queue consumer
 * Follows Interface Segregation Principle
 */
export interface IMessageConsumer {
  /**
   * Starts the message consumer
   */
  start(): Promise<void>;

  /**
   * Stops the message consumer
   */
  stop(): Promise<void>;

  /**
   * Gets the consumer status
   */
  isRunning(): boolean;
}
