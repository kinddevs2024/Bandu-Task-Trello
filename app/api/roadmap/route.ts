import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Внешний URL, который вы указали
const EXTERNAL_API_URL = 'https://api.bandu.uz/api/v1/roadmap'; 

// Next.js автоматически вызывает эту функцию для запросов GET на /api/roadmap
export async function GET(req: NextRequest) {
  try {
    // Выполняем запрос к внешнему API
    const response = await axios.get(EXTERNAL_API_URL);

    // Возвращаем данные внешнего API клиенту
    return NextResponse.json(response.data, { status: response.status });

  } catch (error: any) {
    console.error('Roadmap proxy error:', error.response?.data || error.message);
    
    // Обрабатываем ошибки, возвращаемые внешним API или сетевые ошибки
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Server error during fetching roadmap';
    
    return NextResponse.json({ message }, { status });
  }
}