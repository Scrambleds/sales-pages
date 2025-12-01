import axios, { AxiosInstance } from 'axios';
import { IConfigService } from '../interfaces/IConfigService';
import { GrapesJSProject } from '../../app/core/models/grapesjs.model';

/**
 * Service for fetching configuration from API
 * Follows Single Responsibility Principle - only handles API communication
 * Follows Dependency Inversion Principle - depends on abstractions
 */
export class ConfigService implements IConfigService {
  private httpClient: AxiosInstance;
  private cache: Map<string, { data: GrapesJSProject; timestamp: number }>;
  private cacheTTL: number = 5 * 60 * 1000; // 5 minutes

  constructor(private apiBaseUrl: string) {
    this.httpClient = axios.create({
      baseURL: this.apiBaseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.cache = new Map();
  }

  /**
   * Fetches configuration based on domain with caching
   */
  async getConfigByDomain(domain: string): Promise<GrapesJSProject> {
    const cached = this.cache.get(domain);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      console.log(`[ConfigService] Returning cached config for domain: ${domain}`);
      return cached.data;
    }

    try {
      console.log(`[ConfigService] Fetching config for domain: ${domain}`);
      const response = await this.httpClient.get<GrapesJSProject>(
        `/api/config/${domain}`
      );

      this.cache.set(domain, {
        data: response.data,
        timestamp: Date.now(),
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch config for domain ${domain}: ${error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Clears cache for a specific domain or all domains
   */
  clearCache(domain?: string): void {
    if (domain) {
      this.cache.delete(domain);
    } else {
      this.cache.clear();
    }
  }
}
