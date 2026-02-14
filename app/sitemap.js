export default function sitemap() {
  const baseUrl = 'https://atsas.co.uk';
  
  const routes = [
    '',
    '/designs',
    '/bulk',
    '/customization',
    '/about',
    '/contact',
    '/blog',
    '/faq',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => {
    let priority = 0.5;
    let changeFrequency = 'monthly';

    if (route === '') {
      priority = 1.0;
      changeFrequency = 'daily';
    } else if (['/designs', '/bulk', '/customization'].includes(route)) {
        priority = 0.9;
        changeFrequency = 'weekly';
    } else if (['/blog', '/about'].includes(route)) {
        priority = 0.8;
        changeFrequency = 'weekly';
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });
}
