import { NextResponse } from 'next/server';
import roadmapData from './roadmap.json';

export async function GET() {
  try {
    const response = await fetch('https://api.bandu.uz/api/v1/roadmap', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Add isCompleted to each step based on all tasks completed
    const processedData = data.map((step: any) => ({
      ...step,
      isCompleted: step.tasks ? step.tasks.every((task: any) => task.completed) : false,
    }));

    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    // Fallback to local roadmap.json data, processed the same way
    const processedData = roadmapData.map((step: any) => ({
      ...step,
      isCompleted: step.tasks ? step.tasks.every((task: any) => task.completed) : false,
    }));
    return NextResponse.json(processedData);
  }
}
