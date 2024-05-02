import { NextResponse } from "next/server";

const reviewData = [
  {
    thumbnail:
      "https://cdn-dantats.stunning.kr/prod/markets/b3a2e74d-5c60-40e4-b927-47fe6181b32c/store/d8SsoJQnVK86rLjn.Thumnail_714x490.jpg",
    rate: 4,
    reviewer: "나인소프트",
    reviewDate: "2024.04.24",
    comment:
      "이런저런 요청사항들이 많았는데 대응을 너무 잘해주셔서 좋았습니다! \n덕분에 마음에 드는 로고 만들 수 있어서 감사합니다! ",
    category: "Market",
    productType: "프리미엄",
  },
  {
    thumbnail:
      "https://cdn-dantats.stunning.kr/prod/portfolios/ac4dd972-7fd1-424e-a2cd-376ad4592b19/covers/4zaqijUQs4qT8FqS.CDd7u5p55aYSpWfT.Sign%20on%20Building%202%20%E1%84%87%E1%85%A9%E1%86%A8%E1%84%89%E1%85%A1.jpg.small?q=60&t=crop&s=300x300",
    rate: 5,
    reviewer: "일타돼지국밥",
    reviewDate: "2024.04.23",
    comment:
      "하나하나 디테일하게 수정해주시고\n많이 번거로우셨을 텐데 꼼꼼하게 도와주시고\n여러 시안도 보여주시고 하나하나 친절히 답변해주시고\n감사합니다",
    category: "Contest",
    productType: "실속형",
  },
  {
    rate: 3,
    reviewer: "봄날커뮤니케이션",
    reviewDate: "2024.04.23",
    comment:
      "원하는 방향성에 대해 많은 이야기를 통해 빠르게 해결해주시려고 노력하였어요 그래서 생각보다 빠른 일정으로 로고 제작을 할 수 있었습니다. \n국문 수정 시 다소 까다로울 수 있던 제 요청도 최대한 반영해주셔서 감사합니다! ",
    category: "Deal",
    workingDay: 5,
  },
  {
    thumbnail:
      "https://cdn-dantats.stunning.kr/prod/portfolios/dcbf0844-048a-4881-9176-9fbc3f6a708f/covers/bDqFuBs62TfYiQRU.%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.png.small?q=60&t=crop&s=300x300",
    rate: 5,
    reviewer: "스칼라소프트",
    reviewDate: "2024.04.23",
    comment:
      "작업속도 및 피드백이 빠르고, 의뢰자 입장이 되어 더 나은 방향도 추천하며 수동적으로 디자인 하시지 않는 부분이 매우 좋았습니다.\n",
    category: "Contest",
    productType: "고급형",
  },
  {
    thumbnail:
      "https://cdn-dantats.stunning.kr/prod/markets/f738b47a-f481-4850-b3b9-703891a5f887/store/qVtzNXqP7Fp7wHCf.0.jpg",
    rate: 5,
    reviewer: "nqnalove",
    reviewDate: "2024.04.22",
    comment:
      "디자인 시안은 말할 것도 없고\n처음부터 끝까지 책임감 있게 작업해 주시기 때문에\n매번 믿고 맡기고 있습니다. \n강추!!",
    category: "Market",
    productType: "일반형",
  },
  {
    rate: 4,
    reviewer: "YAMAHA",
    reviewDate: "2024.04.22",
    comment:
      "디자인도 원하는 방향대로 깔끔하게 잘 진행해 주시고, 일정도 잘 맞춰 주셨습니다! 너무 만족합니다!!!! 앞으로도 자주 부탁드릴게요! :)",
    category: "Deal",
    workingDay: 7,
  },
  {
    rate: 5,
    reviewer: "소마유즈, SOMAYUJ",
    reviewDate: "2024.04.19",
    comment:
      "오케이 할 때까지 성심성의껏 수정해 주셨어요. \n편안하고 안정감있게 완성도를 높여갈 수 있게 도와주셔서 감동이었습니다.\n원하는 디자인이 나올 때까지 포기하지 않고 함께 도와주셨어요. 다음에도 의로할 일이 생기면 꼭 연락드리고 싶어요~\n\n",
    category: "Deal",
    workingDay: 7,
  },
  {
    thumbnail:
      "https://cdn-dantats.stunning.kr/prod/markets/296da1e1-ce2d-4de9-a0b4-85b06ccee7b5/store/YCfv2Q4hEuAB8dzT.Untitled-2-01.jpg",
    rate: 1,
    reviewer: "김이든",
    reviewDate: "2024.04.19",
    comment:
      "정말 제가 신경쓰지 못한내용까지 세세하게 잘 챙겨주시고 원하는 느낌을 되게 잘 뽑아내시는것같습니다. 상담하는 내내 친절하셔서 기분좋게 마무리하였어요 ㅎㅎㅎ 잘 사용하겠습니다 감사합니다!!",
    category: "Market",
    productType: "고급형",
  },
  {
    thumbnail:
      "https://cdn-dantats.stunning.kr/prod/markets/829fe451-497d-40c2-8c22-95a4c03de60d/store/EsP253QGXb2FMSgh.%EB%A7%88%EC%BC%93%20%EC%8D%B8%EB%84%A4%EC%9D%BC%20%EC%9B%B9.webp",
    rate: 3,
    reviewer: "가드엑스",
    reviewDate: "2024.04.18",
    comment:
      "로고 의뢰가 처음이었는데 아주 만족스럽습니다. 일단 요청 드린 사항을 잘 반영해주셨고, 작업 및 수정도 신속하게 잘 처리되었습니다. 모션 로고가 확실한 장점이 있어 앞으로 잘 사용할 것 같아요. 추천 드립니다",
    category: "Market",
    productType: "일반형",
  },
  {
    thumbnail:
      "https://cdn-dantats.stunning.kr/prod/markets/b3a2e74d-5c60-40e4-b927-47fe6181b32c/store/d8SsoJQnVK86rLjn.Thumnail_714x490.jpg",
    rate: 4,
    reviewer: "파워풀한핑크5812",
    reviewDate: "2024.04.17",
    comment:
      "연락도 빠르시고 무엇보다 제가 원하는 느낌을 빨리 캐치하셔서 신속하고 너무 마음에 들게 로고 제작하였습니다. \n\n감사합니다 잘 사용하겠습니다 ! \n강릉 레이드백 커피 올림! ",
    category: "Market",
    productType: "일반형",
  },
];

export interface GetReviewListResponse {
  reviews: Review[];
}

export interface Review {
  thumbnail: string;
  rate: number;
  reviewer: string;
  reviewDate: string;
  comment: string;
  category: "Market" | "Contest" | "Deal";
  productType?: string;
  workingDay?: number;
}

export async function GET() {
  return NextResponse.json({
    reviews: reviewData,
  } as GetReviewListResponse);
}
