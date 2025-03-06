export default function sitemap() {
  const baseUrl = 'https://formulas-ai.vercel.app';

  // 基本路由
  const routes = ['', '/en', '/zh', '/ja', '/es', '/fr'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  }));

  return routes;
}