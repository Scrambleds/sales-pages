import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'TestPath',
    renderMode: RenderMode.Server, // บังคับให้หน้านี้เป็น SSR (Server-Side Rendering)
  },
  {
    path: '**',
    renderMode: RenderMode.Client, // หน้าอื่นๆ ให้เป็น CSR (Client-Side Rendering) ทั้งหมด
  }
];
