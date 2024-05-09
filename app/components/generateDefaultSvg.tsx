export default function generateDefaultSvg(
  color?: string,
  height?: string,
  text?: string
): string {
  const width = 855;
  const svg: string = `<svg width="${width}" height="${height || "100"}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color || "blue"}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">${text || "Hello World"}</text>
    </svg>`;
  return svg;
}
