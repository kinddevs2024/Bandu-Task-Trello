import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phoneNumber, password } = body;

    const response = await axios.post(
      `${API_BASE}/auth/login`,
      { phoneNumber, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('Login proxy error:', error.response?.data || error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Server error';
    return NextResponse.json({ message }, { status });
  }
}
