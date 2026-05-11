export default function handler(req, res) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'POST') {
    return res.status(204).end();
  }

  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
