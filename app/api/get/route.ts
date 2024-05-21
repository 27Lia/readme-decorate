// app/api/get/route.ts

import GradientSvg from '@/app/components/GradientSvg';
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
  const gradientColors = [searchParams.get('gradientColor1') || "", searchParams.get('gradientColor2') || ""];

  let svg;

  if (type === "stroke") {
    svg = StrokeSvg(fontColor, backgroundColor, height, text, fontSize);
  } else if (type === "gradient") {
    svg = GradientSvg(fontColor, gradientColors, height, text, fontSize);
  } else {
    svg = `
      <svg width="800" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${backgroundColor}" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" fill="${fontColor}">${text}</text>
      </svg>
    `;
  }


    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  }