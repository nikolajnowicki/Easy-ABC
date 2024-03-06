import Image from "next/image";
import { TextBox } from "./components/TextBox";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  p-0">
      <Header />
      <TextBox />
    </main>
  );
}
