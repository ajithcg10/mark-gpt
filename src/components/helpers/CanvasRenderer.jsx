import React, { useEffect, useRef } from "react";

const CanvasRenderer = ({ htmlData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const renderHTMLContentToCanvas = () => {
      // Set canvas font and style
      ctx.font = "16px Arial";
      ctx.fillStyle = "black";

      let offsetY = 30; // Starting offset for vertical positioning

      // Loop through the HTML data and render each element
      htmlData.forEach((item) => {
        console.log("item ---", item);
        const { tag, content } = item;
        if (tag?.startsWith("<h")) {
          ctx.font = "24px Arial"; // Use a bigger font for headers
        } else {
          ctx.font = "16px Arial";
        }
        ctx.fillText(content, 10, offsetY);
        offsetY += 30; // Increment the vertical offset for the next element
      });
    };

    // Clear the canvas before rendering
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render the HTML content on the canvas
    renderHTMLContentToCanvas();
  }, [htmlData]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default CanvasRenderer;
