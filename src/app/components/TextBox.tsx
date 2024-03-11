"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Raleway Dots",
  src: "/fonts/RalewayDots-Regular.ttf",
});

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f3f4f6",
    padding: 20,
    width: "100%",
    orientation: "portrait",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 40,
  },
  borderedSection: {
    flexGrow: 1,
    margin: 10,
    borderWidth: 5,
    borderColor: "#000",
    padding: 10,
  },
  section: {
    flexGrow: 1,
    margin: 10,
    padding: 10,
  },
  textLine: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "Raleway Dots",
    fontSize: 18,
  },
  line: {
    flexDirection: "row",
  },
});

interface CustomLineProps {
  children: React.ReactNode;
}

const CustomLine: React.FC<CustomLineProps> = ({ children }) => {
  const hardcodedLine =
    "-----------------------------------------------------------------";

  return (
    <View style={styles.textLine}>
      <Text style={styles.text}>{children}</Text>
      <Text style={[styles.text, { marginTop: -13 }]}>{hardcodedLine}</Text>
    </View>
  );
};

interface MyDocumentProps {
  inputText: string;
}

const characterWidthEstimate: Record<string, number> = {
  narrow: 0.5,
  regular: 1,
  wide: 1.5,
};

const characterClassification: Record<string, string> = {
  å: "wide",
  ä: "medium",
  ö: "wide",
  Å: "wide",
  Ä: "medium",
  Ö: "wide",
  a: "narrow",
  b: "narrow",
  c: "narrow",
  d: "narrow",
  e: "narrow",
  f: "narrow",
  g: "narrow",
  h: "narrow",
  i: "narrow",
  j: "narrow",
  k: "narrow",
  l: "narrow",
  m: "wide",
  n: "narrow",
  o: "narrow",
  p: "narrow",
  q: "narrow",
  r: "narrow",
  s: "narrow",
  t: "narrow",
  u: "narrow",
  v: "narrow",
  w: "wide",
  x: "narrow",
  y: "narrow",
  z: "narrow",
  A: "wide",
  B: "wide",
  C: "wide",
  D: "wide",
  E: "wide",
  F: "wide",
  G: "wide",
  H: "wide",
  I: "narrow",
  J: "narrow",
  K: "wide",
  L: "narrow",
  M: "wide",
  N: "wide",
  O: "wide",
  P: "wide",
  Q: "wide",
  R: "wide",
  S: "wide",
  T: "wide",
  U: "wide",
  V: "wide",
  W: "wide",
  X: "wide",
  Y: "wide",
  Z: "wide",
};

const getCharacterFactor = (char: string): number => {
  return characterWidthEstimate[characterClassification[char] || "regular"];
};

const calculateTextWidth = (text: string, fontSize: number): number => {
  return text.split("").reduce((total, char) => {
    return total + getCharacterFactor(char) * fontSize;
  }, 0);
};

const dynamicFontSizeMultiplier = (text: string): number => {
  if (text.length <= 2) {
    return 0.3;
  } else {
    return 0.5;
  }
};

const repeatTextOneLine = (
  text: string,
  pageWidth: number,
  fontSize: number,
  safeWidthPercentage = 0.9
): string => {
  const multiplier = dynamicFontSizeMultiplier(text);
  const textWidth = calculateTextWidth(text, fontSize * multiplier);
  const safeWidth = pageWidth * safeWidthPercentage - fontSize;
  let repeatedText = text;
  let currentWidth = textWidth;

  while (currentWidth + textWidth + fontSize <= safeWidth) {
    repeatedText += " " + text;
    currentWidth += textWidth + fontSize;
  }

  return repeatedText.trim();
};

const MyDocument: React.FC<MyDocumentProps> = ({ inputText }) => {
  const pageWidth = 595.28 - 40;
  const fontSize = 18;
  const repeatedText = repeatTextOneLine(inputText, pageWidth, fontSize);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.borderedSection}>
          <Text style={styles.header}>{inputText}</Text>
          <CustomLine>
            <Text style={styles.text}>{repeatedText}</Text>
          </CustomLine>
        </View>
      </Page>
    </Document>
  );
};

export const TextBox: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setInputText("");
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className="input-style"
          placeholder="Enter text here"
          style={{
            backgroundColor: "#f3f4f6",
            padding: "8px",
            borderRadius: "4px",
            textAlign: inputText ? "left" : "center",
          }}
        />
        {!inputText && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              width: "100%",
              color: "#adb5bd",
              pointerEvents: "none",
              textAlign: "center",
            }}
          >
            Enter text here
          </div>
        )}
      </div>
      <div style={{ marginTop: "10px" }}>
        <PDFDownloadLink
          document={<MyDocument inputText={inputText} />}
          fileName="worksheet.pdf"
          style={{ textDecoration: "none" }}
          onClick={handleDownload}
        >
          {loading ? "Preparing document..." : "Download PDF"}
        </PDFDownloadLink>
      </div>
    </div>
  );
};
