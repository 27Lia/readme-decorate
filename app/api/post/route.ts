import generateAnimatedEggSvg from '@/app/components/generateEggSvg';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { height, text, color, type } = await req.json();

  let svg;
  if (type === "egg") {
    svg = generateAnimatedEggSvg(color, height, text);
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
