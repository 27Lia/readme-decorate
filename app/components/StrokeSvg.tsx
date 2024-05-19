export default function StrokeSvg(
  fontColor: string = "",
  backgroundColor: string = "",
  height: string = "",
  text: string = "",
  fontSize: string = ""
): string {
  const textLength = text.length * 20;

  const svg = `
    <svg width="100%" height="${height}" xmlns="http://www.w3.org/2000/svg">
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
      <rect width="100%" height="100%" fill="${backgroundColor}" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" class="text-ani">${text}</text>
    </svg>
  `;
  return svg;
}
