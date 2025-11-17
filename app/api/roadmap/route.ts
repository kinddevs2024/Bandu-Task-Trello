import { NextResponse } from 'next/server';
import roadmapData from './roadmap.json';

export async function GET() {
  try {
    const response = await fetch('https://api.zayrx.uz/api/v1/roadmap', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
    // Only log unexpected errors (network errors, etc.)
    // 404s and other expected API failures are handled silently
    console.error('Unexpected error fetching roadmap:', error);
  }
  
  // Fallback to local roadmap.json data, processed the same way
  const processedData = roadmapData.map((step: any) => ({
    ...step,
    isCompleted: step.tasks ? step.tasks.every((task: any) => task.completed) : false,
  }));
  return NextResponse.json(processedData);
}
