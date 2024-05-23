export default function StarrySvg(
  width: string = "",
  height: string = "",
  backgroundColor: string = "",
  fontColor: string = "",
  text: string = "",
  fontSize: string = "",
  gradientColors: string[] = ["", ""],
  fontWeight: string = "",
  starColor: string = "#ffffff",
  starCount: number = 70,
  blinkDuration: string = "2s"
): string {
  const stars = Array.from({ length: starCount })
    .map((_, i) => {
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * -parseFloat(blinkDuration);
      const opacity = Math.random();
      return `
          <circle 
            cx="${posX}%" 
            cy="${posY}%" 
            r="1.2" 
            fill="${starColor}" 
            style="animation: blink-ani ${blinkDuration} linear infinite; animation-delay: ${delay}s; opacity: ${opacity};"
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
            @keyframes blink-ani {
              0%, 100% {
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
            }
          </style>
          <rect width="100%" height="100%" fill="${fillColor}" />
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" fill="${fontColor}" font-weight="${fontWeight}">${text}</text>
          ${stars}
        </svg>
      `;
  return svg;
}
