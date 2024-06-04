import { MetadataRoute } from "next";

const generateSitemap = async () => {
  // 예시로 GitHub API를 호출하여 저장소의 파일 목록을 가져옴
  const response = await fetch(
    "https://api.github.com/repos/27Lia/readme-decorate/contents"
  );
  const files = await response.json();

  return files.map((file) => ({
    url: `https://github.com/27Lia/readme-decorate/blob/main/${file.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
};

export default async function sitemap() {
  const sitemapEntries = await generateSitemap();
  return [
    {
      url: "https://github.com/27Lia/readme-decorate",
      priority: 1,
    },
    ...sitemapEntries,
  ];
}
