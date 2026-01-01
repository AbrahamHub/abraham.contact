import type { NextApiRequest, NextApiResponse } from 'next';
import { contentAPI } from '@/lib/contentAPI';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { section } = req.query;

  if (req.method === 'GET') {
    try {
      if (section && typeof section === 'string') {
        const data = await contentAPI.getSection(section as any);
        return res.status(200).json(data);
      } else {
        const data = await contentAPI.getAll();
        return res.status(200).json(data);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch content' });
    }
  }

  if (req.method === 'PUT' && section && typeof section === 'string') {
    try {
      const success = await contentAPI.updateSection(section as any, req.body);
      if (success) {
        return res.status(200).json({ message: 'Content updated successfully' });
      } else {
        return res.status(500).json({ error: 'Failed to update content' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update content' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
