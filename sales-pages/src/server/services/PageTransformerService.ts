import { IPageTransformer } from '../interfaces/IPageTransformer';
import { GrapesJSPage, GrapesJSProject } from '../../app/core/models/grapesjs.model';

/**
 * Service for transforming GrapesJS pages to standard HTML
 * Follows Single Responsibility Principle - only handles page transformation
 * Follows Open/Closed Principle - can be extended without modification
 */
export class PageTransformerService implements IPageTransformer {
  /**
   * Transform GrapesJS custom tags to standard HTML
   * This is the same logic from the Angular PageRendererService
   */
  transformGrapesJSTags(html: string): string {
    return html
      // Replace custom tags with divs
      .replace(/<wrapper([^>]*)>/g, '<div$1>')
      .replace(/<\/wrapper>/g, '</div>')
      .replace(/<product-card([^>]*)>/g, '<div$1>')
      .replace(/<\/product-card>/g, '</div>')
      .replace(/<heading([^>]*)>/g, '<div$1>')
      .replace(/<\/heading>/g, '</div>')
      .replace(/<cta-banner([^>]*)>/g, '<div$1>')
      .replace(/<\/cta-banner>/g, '</div>')
      .replace(/<gridRow([^>]*)>/g, '<div$1>')
      .replace(/<\/gridRow>/g, '</div>')
      .replace(/<gridColumn([^>]*)>/g, '<div$1>')
      .replace(/<\/gridColumn>/g, '</div>')
      .replace(/<footer-section([^>]*)>/g, '<footer$1>')
      .replace(/<\/footer-section>/g, '</footer>')
      .replace(/<text([^>]*)>/g, '<div$1>')
      .replace(/<\/text>/g, '</div>')
      // Remove textnode tags but keep their content
      .replace(/<textnode>(.*?)<\/textnode>/g, '$1');
  }

  /**
   * Builds complete HTML page from GrapesJS project data
   * Includes all styles and scripts
   */
  buildPage(project: GrapesJSProject, pageId?: string): string {
    let page: GrapesJSPage;

    // Find the requested page or use the first one
    if (pageId) {
      const foundPage = project.pages.find((p) => p.id === pageId);
      if (!foundPage) {
        throw new Error(`Page with id ${pageId} not found`);
      }
      page = foundPage;
    } else {
      if (project.pages.length === 0) {
        throw new Error('No pages found in project');
      }
      page = project.pages[0];
    }

    // Transform custom tags
    const transformedHtml = this.transformGrapesJSTags(page.html);

    // Build complete HTML document
    return this.buildHTMLDocument(
      transformedHtml,
      page.css,
      page.js,
      project.globalStyles,
      project.globalScripts,
      page.name
    );
  }

  /**
   * Builds a complete HTML document with all assets
   * @private
   */
  private buildHTMLDocument(
    bodyHtml: string,
    pageCss: string,
    pageJs?: string,
    globalCss?: string,
    globalJs?: string,
    title: string = 'Store Page'
  ): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${this.escapeHtml(title)}</title>
  ${globalCss ? `<style id="global-styles">${globalCss}</style>` : ''}
  ${pageCss ? `<style id="page-styles">${pageCss}</style>` : ''}
</head>
<body>
  ${bodyHtml}
  ${globalJs ? `<script id="global-scripts">${globalJs}</script>` : ''}
  ${pageJs ? `<script id="page-scripts">${pageJs}</script>` : ''}
</body>
</html>`;
  }

  /**
   * Escapes HTML to prevent XSS
   * @private
   */
  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}
