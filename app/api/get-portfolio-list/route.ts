
import generateDefaultSvg from "@/app/components/generateDefaultSvg";
import generateEggSvg from "@/app/components/generateEggSvg";



// API 핸들러 함수
export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405 });
  }

  const { type, color, height, text }: { type?: string; color?: string; height?: string; text?: string } = await request.json();

  let svgData: string;

  switch (type) {
    case 'egg':
      // 에그 스타일의 SVG 생성
      svgData = generateEggSvg(color, height, text);
      break;
    // 다른 타입에 대한 SVG 생성 로직 추가
    default:
      // 기본값으로 처리
      svgData = generateDefaultSvg(color, height, text); // 기본값 SVG 생성
      break;
  }

  
  // SVG 문자열을 응답으로 반환
  const response = new Response(svgData, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });

  return response;
}
