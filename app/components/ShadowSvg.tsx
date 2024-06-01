export default function ShadowSvg(
  width: string = "",
  height: string = "",
  backgroundColor: string = "",
  fontColor: string = "",
  text: string = "",
  fontSize: string = "",
  gradientColors: string[] = ["", ""],
  fontWeight: string = ""
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

  const animations = `
  <style>
        @keyframes pulse {
          0% {
            text-shadow: 0px 0px 5px ${fontColor}88, 0px 0px 10px ${fontColor}88, 0px 0px 15px ${fontColor}88, 0px 0px 20px ${fontColor}88, 0px 0px 25px ${fontColor}88;
          }
          50% {
            text-shadow: 0px 0px 10px ${fontColor}88, 0px 0px 15px ${fontColor}88, 0px 0px 20px ${fontColor}88, 0px 0px 25px ${fontColor}88, 0px 0px 30px ${fontColor}88;
          }
          100% {
            text-shadow: 0px 0px 5px ${fontColor}88, 0px 0px 10px ${fontColor}88, 0px 0px 15px ${fontColor}88, 0px 0px 20px ${fontColor}88, 0px 0px 25px ${fontColor}88;
          }
        }
      </style>
    `;
  const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        ${animations}
        ${gradientDef} 
        <rect width="100%" height="100%" fill="${fillColor}" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}"     fill="${fontColor}" font-weight="${fontWeight}" style="animation: pulse 3s infinite;">
        ${text}
        </text>      
      </svg>
    `;
  return svg;
}
