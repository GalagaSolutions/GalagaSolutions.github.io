export default function handler(req, res) {
  if (req.method === 'POST') {
    return res.status(204).end();
  }
  return res.status(405).json({ error: 'Method Not Allowed' });
}
