import { NextResponse } from "next/server";

export interface GetPortfolioListResponse {
  category1: Portfolio[];
  category2: Portfolio[];
}

export interface Portfolio {
  title: string;
  company: string;
  thumbnail: string;
  url: string;
}

export async function GET() {
  return NextResponse.json({
    category1: [
      {
        title: "농심 ‘오징어짬뽕’ 캐릭터 리뉴얼 디자인!",
        company: "농심",
        thumbnail:
          "https://cdn-dantats.stunning.kr/static/event/advantage/com1.png",
        url: "https://www.loud.kr/contest/view/66221",
      },
      {
        title: "LG U+ 모두의 유심, 원칩 디자인",
        company: "LG U+",
        thumbnail:
          "https://cdn-dantats.stunning.kr/static/event/advantage/com2.png",
        url: "https://www.loud.kr/contest/view/79164",
      },
      {
        title: "NH농협카드의 별다줄 신용카드 디자인을 소개합니다!",
        company: "NH농협카드",
        thumbnail:
          "https://cdn-dantats.stunning.kr/static/event/advantage/com3.png",
        url: "https://www.loud.kr/contest/view/56424",
      },
    ],
    category2: [
        {
          title: "강동구 ‘힘찬 변화, 자랑스러운 강동’ BI 디자인!",
          company: "강동구청",
          thumbnail:
            "https://cdn-dantats.stunning.kr/static/event/advantage/com4.png",
          url: "https://www.loud.kr/contest/view/65104",
        },
        {
          title: "행정안전부 ‘국가 모바일 운전면허증’ BI 제작 성공사례!",
          company: "행정안전부",
          thumbnail:
            "https://cdn-dantats.stunning.kr/static/event/advantage/com5.png",
          url: "https://www.loud.kr/contest/view/55713",
        },
        {
          title: "부산시 도시 브랜드 BI 디자인",
          company: "부산광역시",
          thumbnail:
            "https://cdn-dantats.stunning.kr/static/event/advantage/com6.png",
          url: "https://www.loud.kr/contest/view/78462",
        },
      ],
  } as GetPortfolioListResponse);
}
