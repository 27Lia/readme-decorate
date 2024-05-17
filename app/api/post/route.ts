import GenerateAnimatedEggSvg from '@/app/components/GenerateEggSvg';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { height, text, color, type } = await req.json();

  let svg;
  if (type === "egg") {
    svg = GenerateAnimatedEggSvg(color, height, text);
  } else {
    svg = `
      <svg width="1000" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${color}" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="white">${text}</text>
      </svg>
    `;
  }

  const base64Svg = Buffer.from(svg).toString('base64');
  const svgUrl = `data:image/svg+xml;base64,${base64Svg}`;

  return NextResponse.json({ url: svgUrl });
}


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const height = searchParams.get('height');
  const text = searchParams.get('text');
  const color = searchParams.get('color');
  const type = searchParams.get('type');

  let svg;
  if (type === "egg") {
    svg = GenerateAnimatedEggSvg(color || "blue", height || "200", text || "");
  } else {
    svg = `
      <div>svg width="200" height="${height}" xmlns="http://www.w3.org/2000/svg"&gt;
        <div>rect width="100%" height="100%" fill="${color}" /&gt;
        <div>text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="white"&gt;${text}<div>/text&gt;
      <div>/svg&gt;
    `;
  }

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
}