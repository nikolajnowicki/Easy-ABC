"use client";

import React, { useState } from "react";
import axios from "axios";

export const TextBox = () => {
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const containerWidth = 600;
  const fontSize = 28;
  const fontFamily = "Raleway Dots";

  const generateRepeatedText = (
    text: string,
    containerWidth: number,
    fontSize: number,
    fontFamily: string
  ): string => {
    const font = `${fontSize}px '${fontFamily}'`;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not get canvas context");
    }

    context.font = font;

    let widthPercentage = 0.8;
    if (text.length === 1) {
      widthPercentage = 1;
    } else if (text.length === 2) {
      widthPercentage = 0.95;
    }

    let repeatedText = "";
    const maxWidth = containerWidth * widthPercentage;

    while (true) {
      const newText =
        repeatedText + (repeatedText.length > 0 ? " " : "") + text;
      const newTextWidth = context.measureText(newText).width;
      if (newTextWidth > maxWidth) {
        break;
      }
      repeatedText = newText;
    }

    const words = repeatedText.trim().split(" ");
    while (
      context.measureText(repeatedText).width > maxWidth &&
      words.length > 1
    ) {
      words.pop();
      repeatedText = words.join(" ");
    }

    return repeatedText;
  };

  const generatePDF = async () => {
    try {
      await document.fonts.load(`${fontSize}px '${fontFamily}'`);

      const repeatedText = generateRepeatedText(
        inputText,
        containerWidth,
        fontSize,
        fontFamily
      );

      const htmlContent = `
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Raleway+Dots&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: '${fontFamily}', sans-serif;
            background-color: #f3f4f6;
            padding: 20px; 
            margin: 0; 
          }
          .container {
            height: 95%;
            margin: 0 auto;
            padding: 15px; 
            border: 6px solid #333;
          }
          .box {
            width: 100%;
            padding-bottom: 20px; 
          }
          .box-1 {
            width: 100%;
            padding-bottom: 20px; 
            padding-top: 40px;
          }
          h1 {
            color: #333;
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px; 
            padding-bottom: 10px;
          }
          p {
            position: relative;
            color: #666;
            font-size: ${fontSize}px;
            line-height: 1.2; 
            text-align: start;
            padding-top: 0px; 
            margin: 0; 
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            letter-spacing: 0.1em;
          }
          .under-line {
            position: relative;
            bottom: 18px
          
            
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${inputText}</h1>
          <div class="box-1">
            <p class="first-text">${repeatedText}</p>
            <div class="under-line">--------------------------------------------------------------------------------------------------------</div>
          </div>

          <div class="box">
            <p>${repeatedText}</p>
            <div class="under-line">--------------------------------------------------------------------------------------------------------</div>
          </div>

          <div class="box">
            <p>${repeatedText}</p>
            <div class="under-line">--------------------------------------------------------------------------------------------------------</div>
          </div>

          <div class="box ">
            <p>${repeatedText}</p>
            <div class="under-line">--------------------------------------------------------------------------------------------------------</div>
          </div>

          <div class="box">
            <p>${repeatedText}</p>
            <div class="under-line">--------------------------------------------------------------------------------------------------------</div>
          </div>

          <div class="box">
            <p>${repeatedText}</p>
            <div class="under-line">--------------------------------------------------------------------------------------------------------</div>
          </div>

          <div class="box">
            <p>${repeatedText}</p>
            <div class="under-line">--------------------------------------------------------------------------------------------------------</div>
          </div>

          <div class="box">
            <p>${repeatedText}</p>
            <div class="under-line">--------------------------------------------------------------------------------------------------------</div>
          </div>

          <div class="box">
            <p>${repeatedText}</p>
            <div class="under-line">--------------------------------------------------------------------------------------------------------</div>
          </div>

          <div class="box">
            <p>${repeatedText}</p>
            <div class="under-line">--------------------------------------------------------------------------------------------------------</div>
          </div>

          <div class="box">
            <p>${repeatedText}</p>
            <div class="under-line">--------------------------------------------------------------------------------------------------------</div>
          </div>

          <div class="box">
            <p>${repeatedText}</p>
            <div class="under-line">--------------------------------------------------------------------------------------------------------</div>
          </div>

        </div>
      </body>
    </html>`;

      const response = await axios.post(
        "/api/generate-pdf",
        { htmlContent },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "worksheet.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      setPdfGenerated(true);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <p className="pb-4 font-semibold px-4 text-sm md:text-lg">
        Type what you want and generate a worksheet PDF
      </p>
      <input
        type="text"
        placeholder="Text / Letter"
        value={inputText}
        onChange={handleInputChange}
        className="outline-none border-2 border-gray-400 rounded-lg px-4 py-2 text-left "
      />{" "}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded "
        onClick={generatePDF}
      >
        Create
      </button>
      {pdfGenerated && <p className="mt-6">PDF generated successfully!</p>}
    </div>
  );
};
