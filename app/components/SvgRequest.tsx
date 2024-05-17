import { useState } from "react";

export default function SvgRequest() {
  const [height, setHeight] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("rectangle");
  const [svgUrl, setSvgUrl] = useState<string | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

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

  const generateUrl = () => {
    const baseUrl = window.location.origin;
    const query = new URLSearchParams({
      height,
      text,
      color,
      type,
    }).toString();
    const url = `${baseUrl}/api/post?${query}`;
    setGeneratedUrl(url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full custom-width">
        <h1 className="text-2xl font-bold mb-6 text-center">SVG Generator</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Height:</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter height"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Text:</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter text"
            />
          </div>
          <div className="mb-4">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="border rounded-lg"
            />

            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="ml-4 px-3 py-2 border rounded-lg"
              placeholder="#000000"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="rectangle">Rectangle</option>
              <option value="egg">Egg</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Generate SVG
          </button>
        </form>
        <button
          onClick={generateUrl}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mt-4"
        >
          Generate URL
        </button>
        {generatedUrl && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Generated URL:</h2>
            <a
              href={generatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {generatedUrl}
            </a>
          </div>
        )}
        {svgUrl && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Generated SVG:</h2>
            <img src={svgUrl} alt="Generated SVG" className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
