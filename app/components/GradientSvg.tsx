export default function GradientSvg(
  width: string = "",
  height: string = "",
  gradientColors: string[] = ["", ""],
  fontColor: string = "",
  text: string = "",
  fontSize: string = ""
): string {
  const gradientStops = gradientColors
    .map(
      (color, index) =>
        `<stop offset="${(index / (gradientColors.length - 1)) * 100}%" stop-color="${color}" />`
    )
    .join("");

  const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            ${gradientStops}
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" fill="${fontColor}">
          ${text}
        </text>
      </svg>
    `;
  return svg;
}
