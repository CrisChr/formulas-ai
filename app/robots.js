export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://formulas-ai.vercel.app/sitemap.xml',
  };
}