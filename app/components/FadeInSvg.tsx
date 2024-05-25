export default function FadeInSvg(
  width: string = "",
  height: string = "",
  backgroundColor: string = "",
  fontColor: string = "",
  text: string = "",
  fontSize: string = "",
  gradientColors: string[] = ["", ""],
  fontWeight: string = ""
): string {
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

  const textSpans = text
    .split("")
    .map(
      (char, index) =>
        `<span style="animation-delay: ${index * 0.1}s;" >${char}</span>`
    )
    .join("");

  const svg = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
              ${gradientDef}
              <style>
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                  }
                }
                .typing-container {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100%;
                  width: 100%;
                }
                .typing-text {
                  font-size: ${fontSize}px;
                  color: ${fontColor};
                  font-weight: ${fontWeight};
                  white-space: nowrap;
                }
                .typing-text span {
                  opacity: 0;
                  display: inline-block;
                  animation: fadeIn 0.5s forwards;
                }
              </style>
              <rect width="100%" height="100%" fill="${fillColor}" />
              <foreignObject x="0" y="0" width="100%" height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml" class="typing-container">
                  <div class="typing-text">${textSpans}</div>
                </div>
              </foreignObject>
            </svg>
          `;
  return svg;
}
