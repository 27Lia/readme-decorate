// app/api/get/route.ts


import StrokeSvg from '@/app/components/StrokeSvg';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const height = searchParams.get('height');
    const text = searchParams.get('text');
    const color = searchParams.get('color');
    const type = searchParams.get('type');
  
   let svg;
    if (type === "stroke") {
      svg = StrokeSvg(color || "", height || "", text || "");
    } 

    else {
      svg = `
        <svg width="800" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${color}" />
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="white">${text}</text>
        </svg>
      `;
    }
  
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  }