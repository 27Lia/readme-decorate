// app/api/post/route.ts

import CircleSvg from '@/app/components/CircleSvg';
import FadeInSvg from '@/app/components/FadeInSvg';
import RectangleSvg from '@/app/components/RectangleSvg';
import StarrySvg from '@/app/components/StarrySvg';
import StrokeSvg from '@/app/components/StrokeSvg';
import WaveSvg from '@/app/components/WavSvg';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { height, width, text, fontColor, backgroundColor, fontSize, gradientColors, type,fontWeight } = await req.json();

  let svg;
  if (type === "stroke") {
    svg = StrokeSvg(width, height, backgroundColor, fontColor, text, fontSize, gradientColors,fontWeight);
  } 
  else if (type === "circle") {
    svg = CircleSvg(width, height, backgroundColor, fontColor, text, fontSize, gradientColors,fontWeight);
  } 
  else if (type === "rectangle") {
    svg = RectangleSvg(width, height, backgroundColor, fontColor, text, fontSize, gradientColors,fontWeight);
  }
  else if (type === "fadein") {
    svg = FadeInSvg(width, height, backgroundColor, fontColor, text, fontSize, gradientColors,fontWeight);
  }
  else if (type === "star") {
    svg = StarrySvg(width, height, backgroundColor, fontColor, text, fontSize, gradientColors,fontWeight);
  }
  else if (type === "wave") {
    svg = WaveSvg(width, height, backgroundColor, fontColor, text, fontSize, gradientColors,fontWeight);
  }
  if (!svg) {
    return NextResponse.json({ error: "SVG generation failed" }, { status: 400 });
  }
  
  const base64Svg = Buffer.from(svg).toString('base64');
  const svgUrl = `data:image/svg+xml;base64,${base64Svg}`;

  return NextResponse.json({ url: svgUrl });
}


