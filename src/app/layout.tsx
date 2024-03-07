import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Create Kids' Writing Practice Worksheets - Easy ABC Worksheet Generator",
  description:
    "Discover the easiest way to create engaging worksheets for children with Easy ABC Worksheet Creator. Tailored for parents, educators, and homeschooling, our app offers a simple solution to make personalized alphabet and letter writing practice fun and effective. Boost your child's literacy skills with customizable worksheets designed to enhance learning through practice. Get started now and join thousands of satisfied users creating better learning experiences for children. Try it for free today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
