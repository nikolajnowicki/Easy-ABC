import { TextBox } from "./components/TextBox";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  p-0">
      <Header />
      <TextBox />
      <Footer />
    </main>
  );
}
