"use client";
import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Raleway Dots",
  src: "/fonts/RalewayDots-Regular.ttf",
});

// Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f3f4f6",
    padding: 20,
    width: "100%",
    orientation: "portrait",
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
    "--------------------------------------------------------------------";

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
  const pageWidth = 595.28;
  const fontSize = 18;
  const repeatedText = repeatTextOneLine(inputText, pageWidth, fontSize);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        className="input-style"
        placeholder="Enter text here"
      />
      {inputText && (
        <PDFDownloadLink
          document={<MyDocument inputText={inputText} />}
          fileName="worksheet.pdf"
          style={{ textDecoration: "none", marginTop: "10px" }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Preparing document..." : "Download PDF"
          }
        </PDFDownloadLink>
      )}
    </div>
  );
};
