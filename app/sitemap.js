export default function sitemap() {
  const baseUrl = 'https://atsas.co.uk';
  
  const routes = [
    '',
    '/designs',
    '/builder',
    '/bulk',
    '/draw',
    '/about',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
    '/track',
    '/blog',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/builder' ? 0.9 : 0.7,
  }));
}
