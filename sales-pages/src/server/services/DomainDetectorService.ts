import { IDomainDetector } from '../interfaces/IDomainDetector';

/**
 * Service for detecting domain from request
 * Follows Single Responsibility Principle - only handles domain detection
 */
export class DomainDetectorService implements IDomainDetector {
  /**
   * Extracts domain from request host header
   * Removes port if present and normalizes to lowercase
   */
  detectDomain(host: string): string {
    if (!host) {
      throw new Error('Host header is required');
    }

    // Remove port if present
    const domain = host.split(':')[0].toLowerCase();

    // Remove www. prefix if present
    return domain.replace(/^www\./, '');
  }
}
