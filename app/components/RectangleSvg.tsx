export default function RectangleSvg(
  width: string = "",
  height: string = "",
  backgroundColor: string = "",
  fontColor: string = "",
  text: string = "",
  fontSize: string = "",
  gradientColors: string[] = ["", ""]
): string {
  const gradientDef =
    gradientColors[0] && gradientColors[1]
      ? `
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${gradientColors[0]};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${gradientColors[1]};stop-opacity:1" />
      </linearGradient>
    </defs>
  `
      : "";

  const fillColor =
    gradientColors[0] && gradientColors[1] ? "url(#grad1)" : backgroundColor;

  const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      ${gradientDef} 
        <rect width="100%" height="100%" fill="${fillColor}" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" fill="${fontColor}">${text}</text>
        </svg>
    `;
  return svg;
}
