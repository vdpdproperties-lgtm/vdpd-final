import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      app: 'Vrindavan Dham Property & Developers (VDPD)',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
  });

  // Auth endpoint
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@vdpd.in' && password === 'admin123') {
      return res.json({
        success: true,
        token: 'vdpd_jwt_token_demo_valid',
        user: {
          id: 'adm-1',
          name: 'Radheshyam Agarwal',
          email: 'admin@vdpd.in',
          role: 'Super Admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        }
      });
    }
    return res.status(401).json({ success: false, error: 'Invalid credentials. Use admin@vdpd.in / admin123' });
  });

  // Dynamic XML Sitemap route
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('host');
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>${baseUrl}/properties</loc><changefreq>daily</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/projects</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/about</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${baseUrl}/contact</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/blog</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>${baseUrl}/properties/premium-residential-plots</loc><priority>0.8</priority></url>
  <url><loc>${baseUrl}/properties/luxury-villas</loc><priority>0.8</priority></url>
  <url><loc>${baseUrl}/properties/strategic-investment-plots</loc><priority>0.8</priority></url>
  <url><loc>${baseUrl}/properties/gated-township-plots</loc><priority>0.8</priority></url>
  <url><loc>${baseUrl}/properties/shop-office-spaces</loc><priority>0.8</priority></url>
  <url><loc>${baseUrl}/properties/farmhouse-retreat-land</loc><priority>0.8</priority></url>
</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  // Vite middleware in dev / static in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VDPD Real Estate Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
