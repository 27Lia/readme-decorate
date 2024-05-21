// app/api/post/route.ts



import GradientSvg from '@/app/components/GradientSvg';
import StrokeSvg from '@/app/components/StrokeSvg';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { height, width, text, fontColor, backgroundColor, fontSize, gradientColors, type } = await req.json();

  let svg;
   if (type === "stroke") {
    svg = StrokeSvg(width, height, backgroundColor, fontColor, text, fontSize);
  } 
  else if (type === "gradient") {
    svg = GradientSvg(width, height, gradientColors, fontColor, text, fontSize);
  } 
  else {
    svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" fill="${fontColor}">${text}</text>
      </svg>
    `;
  }

  const base64Svg = Buffer.from(svg).toString('base64');
  const svgUrl = `data:image/svg+xml;base64,${base64Svg}`;

  return NextResponse.json({ url: svgUrl });
}


