// app/api/get/route.ts

import CircleSvg from '@/app/components/CircleSvg';
import FadeInSvg from '@/app/components/FadeInSvg';
import RectangleSvg from '@/app/components/RectangleSvg';
import ShadowSvg from '@/app/components/ShadowSvg';
import StarrySvg from '@/app/components/StarrySvg';
import StrokeSvg from '@/app/components/StrokeSvg';
import WaveSvg from '@/app/components/WavSvg';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const height = searchParams.get('height') || "";
  const text = searchParams.get('text') || "";
  const fontColor = searchParams.get('fontColor') || "";
  const fontSize = searchParams.get('fontSize') || "";
  const backgroundColor = searchParams.get('backgroundColor') || "#FFFFFF";
  const type = searchParams.get('type') || "rectangle";
  const width = searchParams.get('width') || "";
  const fontWeight = searchParams.get('fontWeight') || "";
  const gradientColors = [searchParams.get('gradientColor1') || "", searchParams.get('gradientColor2') || ""];

  let svg;
  
  if (type === "stroke") {
    svg = StrokeSvg(width, height, backgroundColor, fontColor, text, fontSize, gradientColors,fontWeight);
  } else if (type === "circle") {
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
  else if (type === "shadow") {
    svg = ShadowSvg(width, height, backgroundColor, fontColor, text, fontSize, gradientColors,fontWeight);
  }
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  }