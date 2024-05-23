export default function CircleSvg(
  width: string = "",
  height: string = "",
  backgroundColor: string = "",
  fontColor: string = "",
  text: string = "",
  fontSize: string = "",
  gradientColors: string[] = ["", ""],
  fontWeight: string = "",
  snowColor: string = "white",
  snowRadius: string = "5",
  fallDuration: string = "3s",
  snowflakeCount: number = 18
): string {
  const snowflakes = Array.from({ length: snowflakeCount })
    .map((_, i) => {
      const delay = Math.random() * -parseFloat(fallDuration);
      const startX = Math.random() * 100;
      return `
          <circle 
            cx="${startX}%" 
            cy="-${snowRadius}" 
            r="${snowRadius}" 
            fill="${snowColor}" 
            style="animation: fall-ani ${fallDuration} linear infinite; animation-delay: ${delay}s;"
          />
        `;
    })
    .join("");

  const gradientStops =
    gradientColors[0] && gradientColors[1]
      ? gradientColors
          .map(
            (color, index) =>
              `<stop offset="${(index / (gradientColors.length - 1)) * 100}%" stop-color="${color}" />`
          )
          .join("")
      : "";

  const gradientDef =
    gradientColors[0] && gradientColors[1]
      ? `
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        ${gradientStops}
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
          @keyframes fall-ani {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(100vh);
            }
          }
        </style>
        <rect width="100%" height="100%" fill="${fillColor}" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" fill="${fontColor}" font-weight="${fontWeight}">${text}</text>
        ${snowflakes}
      </svg>
    `;
  return svg;
}
