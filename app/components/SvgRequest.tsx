import { useState } from "react";

export default function SvgRequest() {
  const [height, setHeight] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("rectangle");
  const [svgUrl, setSvgUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ height, text, color, type }),
    });

    if (response.ok) {
      const { url } = await response.json();
      setSvgUrl(url);
    }
    console.log(svgUrl);
  };

  return (
    <div>
      <h1>SVG Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Height:</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div>
          <label>Text:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="rectangle">Rectangle</option>
            <option value="egg">Egg</option>
          </select>
        </div>
        <button type="submit">Generate SVG</button>
      </form>
      {svgUrl && (
        <div>
          <h2>Generated SVG:</h2>
          <img src={svgUrl} alt="Generated SVG" />
        </div>
      )}
    </div>
  );
}
