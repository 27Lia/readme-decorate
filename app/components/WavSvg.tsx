export default function WaveSvg(
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
        @keyframes bounce {
          0% { transform: translateY(0px) translateX(-10px); }
          50% { transform: translateY(-10px) translateX(10px); }
          100% { transform: translateY(0px) translateX(-10px); }
        }
        @keyframes rotate {
          0% { transform: rotate(-25deg); }
          100% { transform: rotate(25deg); }
        }

      </style>
    `;

  const rainbowColors = [
    "#4B0082",
    "#00FF00",
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#0000FF",
  ];

  const textElements = Array.from(
    { length: 17 },
    (_, index) => `
      <text x="50%" y="${(index + 28) * (100 / 70)}%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" fill="${fontColor}" font-weight="${fontWeight}" stroke="${rainbowColors[index % rainbowColors.length]}" stroke-width="1" style="animation: bounce 1s ease-in-out infinite; animation-delay: ${index / -20}s;">
        <tspan style="animation: rotate 1s ease-in-out infinite alternate; animation-delay: ${index / -5}s;">${text}</tspan>
      </text>
    `
  ).join("");

  const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        ${animations}
        ${gradientDef}
          <rect width="100%" height="100%" fill="${fillColor}" />
          ${textElements}
        </svg>
      `;
  return svg;
}
