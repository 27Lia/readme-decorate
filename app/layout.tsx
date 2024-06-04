import "./globals.css";
import SEO from "../next-seo.config";

export const metadata = {
  ...SEO,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
