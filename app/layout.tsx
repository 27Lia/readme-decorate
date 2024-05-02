import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "스터닝 랜딩 페이지",
  description: "스터닝 프론트엔드 사전과제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
      </head>
      <body>{children}</body>
    </html>
  );
}
