//components/generateEggSvg

export default function generateAnimatedEggSvg(
  color: string = "blue",
  height?: string,
  text?: string
): string {
  const width = 855;
  const radius = width / 2;
  const bounceHeight = 10; // 튕기는 높이
  const svg = `<svg width="${width}" height="${height || radius * 2}" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="${width / 2}" cy="${radius}" rx="${width / 2}" ry="${radius}" fill="${color}">
      <animate attributeName="ry" values="${radius}; ${radius + bounceHeight}; ${radius}" dur="1s" repeatCount="indefinite"/>
    </ellipse>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">${text}</text>
  </svg>`;
  return svg;
}
