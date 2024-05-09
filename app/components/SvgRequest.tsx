import React, { useState } from "react";

export default function SvgRequest() {
  const [type, setType] = useState("");
  const [color, setColor] = useState("blue");
  const [height, setHeight] = useState("100px");
  const [text, setText] = useState("Hello World");
  const [svgData, setSvgData] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const requestBody = { type, color, height, text };
      console.log(requestBody);
      const response = await fetch(
        `https://readme-decorate.vercel.app/api/get-portfolio-list?type=${type}&color=${color}&height=${height}&text=${text}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const svgData = await response.text();
      setSvgData(svgData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select a type</option>
            <option value="egg">Egg</option>
            <option value="rectangle">Rectangle</option>
            <option value="wave">Wave</option>
          </select>
        </label>
        <label>
          Color:
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <label>
          Height:
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
        <label>
          Text:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div dangerouslySetInnerHTML={{ __html: svgData }} />
    </div>
  );
}
