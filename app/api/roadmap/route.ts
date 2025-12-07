import { NextResponse } from 'next/server';
import roadmapData from './roadmap.json';

export async function GET() {
  try {
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch('https://api.zayrx.uz/api/v1/roadmap', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();

      // Add isCompleted to each step based on all tasks completed
      const processedData = data.map((step: any) => ({
        ...step,
        isCompleted: step.tasks ? step.tasks.every((task: any) => task.completed) : false,
      }));

      return NextResponse.json(processedData);
    }
    // If API returns non-ok status (e.g., 404), fall through to local data
  } catch (error) {
    // Silently fall back to local data for network errors
    // Suppress all fetch-related errors since we have a local fallback
    const isFetchError = 
      error instanceof TypeError ||
      (error instanceof Error && (error.name === 'AbortError' || error.message.includes('fetch') || error.message.includes('ECONNRESET'))) ||
      (error instanceof Error && (error as any).cause?.code === 'ECONNRESET');
    
    // Only log unexpected errors that aren't fetch-related
    if (!isFetchError) {
      console.error('Unexpected error fetching roadmap:', error);
    }
  }
  
  // Fallback to local roadmap.json data, processed the same way
  const processedData = roadmapData.map((step: any) => ({
    ...step,
    isCompleted: step.tasks ? step.tasks.every((task: any) => task.completed) : false,
  }));
  return NextResponse.json(processedData);
}
