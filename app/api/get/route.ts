// app/api/get/route.ts

import CircleSvg from '@/app/components/CircleSvg';
import RectangleSvg from '@/app/components/RectangleSvg';
import StrokeSvg from '@/app/components/StrokeSvg';
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

  const gradientColors = [searchParams.get('gradientColor1') || "", searchParams.get('gradientColor2') || ""];

  let svg;

  if (type === "stroke") {
    svg = StrokeSvg(width, height, backgroundColor, fontColor, text, fontSize, gradientColors);
  } else if (type === "circle") {
    svg = CircleSvg(width, height, backgroundColor, fontColor, text, fontSize, gradientColors);
  } 
  else if (type === "rectangle") {
    svg = RectangleSvg(width, height, backgroundColor, fontColor, text, fontSize, gradientColors);
  }

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  }