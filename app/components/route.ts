import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.bandu.uz/api/v1/roadmap");
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch roadmap" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
