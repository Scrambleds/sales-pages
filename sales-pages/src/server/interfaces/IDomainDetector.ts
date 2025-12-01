/**
 * Interface for domain detection service
 * Follows Interface Segregation Principle
 */
export interface IDomainDetector {
  /**
   * Extracts domain from request host header
   * @param host - The host header from request
   * @returns The detected domain
   */
  detectDomain(host: string): string;
}
