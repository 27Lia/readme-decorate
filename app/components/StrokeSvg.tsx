export default function StrokeSvg(
  width: string = "",
  height: string = "",
  backgroundColor: string = "",
  fontColor: string = "",
  text: string = "",
  fontSize: string = "",
  gradientColors: string[] = ["", ""],
  fontWeight: string = ""
): string {
  const textLength = text.length * 20;

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
    <style>
        .text-ani {
          fill: none;
          stroke: ${fontColor};
          stroke-width: 1px;
          stroke-dasharray: ${textLength};
          stroke-dashoffset: ${textLength};
          animation: text-ani 1s linear forwards, fill-ani 0s 1s forwards;
        }
        @keyframes text-ani {
          0% {
            stroke-dashoffset: ${textLength};
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fill-ani {
          0% {
            fill: none;
          }
          100% {
            fill: ${fontColor};
          }
        }
        
      </style>
      <rect width="100%" height="100%" fill="${fillColor}" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" class="text-ani" font-weight="${fontWeight}">${text}</text>
    </svg>
  `;
  return svg;
}
