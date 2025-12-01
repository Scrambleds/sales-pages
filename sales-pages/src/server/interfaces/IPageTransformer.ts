import { GrapesJSPage, GrapesJSProject } from '../../app/core/models/grapesjs.model';

/**
 * Interface for page transformation service
 * Follows Interface Segregation Principle
 */
export interface IPageTransformer {
  /**
   * Transforms GrapesJS custom tags to standard HTML
   * @param html - The HTML string with custom tags
   * @returns Transformed HTML string
   */
  transformGrapesJSTags(html: string): string;

  /**
   * Builds complete HTML page from GrapesJS project data
   * @param project - The GrapesJS project configuration
   * @param pageId - Optional page ID to render specific page
   * @returns Complete HTML page as string
   */
  buildPage(project: GrapesJSProject, pageId?: string): string;
}
