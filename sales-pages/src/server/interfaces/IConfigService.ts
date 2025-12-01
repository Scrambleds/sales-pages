import { GrapesJSProject } from '../../app/core/models/grapesjs.model';

/**
 * Interface for configuration service
 * Follows Interface Segregation Principle
 */
export interface IConfigService {
  /**
   * Fetches configuration based on domain
   * @param domain - The domain to fetch config for
   * @returns Promise with the project configuration
   */
  getConfigByDomain(domain: string): Promise<GrapesJSProject>;
}
