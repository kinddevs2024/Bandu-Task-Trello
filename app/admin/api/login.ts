import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { phoneNumber, password } = req.body;

    const response = await axios.post(
      `${API_BASE}/auth/login`,
      { phoneNumber, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('Login proxy error:', error.response?.data || error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Server error';
    return res.status(status).json({ message });
  }
}
