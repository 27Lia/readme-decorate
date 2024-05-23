import { useState } from "react";
import Image from "next/image";

export default function SvgRequest() {
  const [height, setHeight] = useState("250");
  const [width, setWidth] = useState("850");
  const [text, setText] = useState("Hello");
  const [fontColor, setFontColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [fontSize, setFontSize] = useState("70");
  const [type, setType] = useState("rectangle");
  const [svgUrl, setSvgUrl] = useState<string | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [gradientColor1, setGradientColor1] = useState("#C6FFDD");
  const [gradientColor2, setGradientColor2] = useState("#FBD786");
  const [useGradient, setUseGradient] = useState(false);
  const [fontWeight, setFontWeight] = useState("800");
  const [copySuccess, setCopySuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody = {
      height,
      width,
      text,
      fontColor,
      fontSize,
      type,
      fontWeight,

      ...(useGradient
        ? { gradientColors: [gradientColor1, gradientColor2] }
        : { backgroundColor }),
    };

    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const { url } = await response.json();
      setSvgUrl(url);
    }
  };

  const generateUrl = () => {
    const baseUrl = window.location.origin;
    const queryParams: any = {
      height,
      width,
      text,
      fontColor,
      fontSize,
      type,
      fontWeight,

      ...(useGradient
        ? { gradientColor1, gradientColor2 }
        : { backgroundColor }),
    };

    const query = new URLSearchParams(queryParams).toString();
    const url = `${baseUrl}/api/get?${query}`;
    setGeneratedUrl(url);
  };

  const copyToClipboard = async (e: React.FormEvent) => {
    e.preventDefault();

    if (generatedUrl) {
      try {
        await navigator.clipboard.writeText(generatedUrl);
        setCopySuccess("복사되었습니다!");
        setTimeout(() => setCopySuccess(""), 2000);
      } catch (err) {
        setCopySuccess("복사에 실패했습니다.");
        setTimeout(() => setCopySuccess(""), 2000);
      }
    }
  };

  return (
    <div className="min-h-screen flex gap-8 flex-wrap items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full custom-width">
        <h1 className="text-2xl font-bold mb-6 text-center">SVG Generator</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="rectangle">Rectangle</option>
              <option value="stroke">Stroke</option>
              <option value="circle">Circle</option>
              <option value="fadein">FadeIn</option>
            </select>
          </div>

          <div className="flex gap-5">
            <div className="mb-4">
              <label className="block text-gray-700">Width</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter width"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Height</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter height"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter text"
            />
          </div>

          <div className="flex gap-5">
            <div className="mb-4">
              <label className="block text-gray-700">Font Size</label>
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter font size"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Font Weight</label>
              <input
                value={fontWeight}
                onChange={(e) => setFontWeight(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="mb-4">
              <label className="block text-gray-700">Font Color</label>
              <input
                type="color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="border rounded-lg"
              />
              <input
                type="text"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="ml-4 px-3 py-2 border rounded-lg"
                placeholder="#000000"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Background Color</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="border rounded-lg"
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="ml-4 px-3 py-2 border rounded-lg"
                placeholder="#FFFFFF"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Use Gradient:</label>
            <input
              type="checkbox"
              checked={useGradient}
              onChange={() => setUseGradient(!useGradient)}
              className="border rounded-lg"
            />
          </div>

          {useGradient && (
            <div className="flex gap-5">
              <div className="mb-4">
                <label className="block text-gray-700">Gradient Color 1</label>
                <input
                  type="color"
                  value={gradientColor1}
                  onChange={(e) => setGradientColor1(e.target.value)}
                  className="border rounded-lg"
                />
                <input
                  type="text"
                  value={gradientColor1}
                  onChange={(e) => setGradientColor1(e.target.value)}
                  className="ml-4 px-3 py-2 border rounded-lg"
                  placeholder="#C6FFDD"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Gradient Color 2</label>
                <input
                  type="color"
                  value={gradientColor2}
                  onChange={(e) => setGradientColor2(e.target.value)}
                  className="border rounded-lg"
                />
                <input
                  type="text"
                  value={gradientColor2}
                  onChange={(e) => setGradientColor2(e.target.value)}
                  className="ml-4 px-3 py-2 border rounded-lg"
                  placeholder="#FBD786"
                />
              </div>
            </div>
          )}

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
      </div>
      <div className="flex flex-col">
        {generatedUrl && (
          <div
            className="mt-4 bg-gray-100 rounded-lg"
            style={{ width: "850px", wordBreak: "break-word" }}
          >
            <h2 className="text-lg font-semibold">Generated URL</h2>
            <a
              href="#"
              onClick={copyToClipboard}
              className="text-blue-500 underline break-all"
              style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
            >
              {generatedUrl}
            </a>
            {copySuccess && (
              <div className="text-black-500 mt-2">{copySuccess}</div>
            )}
          </div>
        )}
        {svgUrl && (
          <div className="mt-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Generated SVG</h2>
            <Image
              src={svgUrl}
              alt="Generated SVG"
              width={Number(width)}
              height={Number(height)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
