import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  p-0">
      <Header />
      <div className="w-96 mx-auto">
        <p>
          This is a small side project of mine that I made when my 4-year-old
          son wanted to learn how to write.
        </p>

        <p className="pt-4">
          It is free to use, and if you want to get in touch with me or report a
          bug, please contact me at{" "}
          <a
            className="font-semibold hover:text-sky-600"
            href="mailto:nikolaj.nowicki@hotmail.com"
          >
            nikolaj.nowicki@hotmail.com
          </a>
        </p>

        <Link href="/">
          <p className="text-sm mr-4 pt-4  justify-center hover:text-sky-600">
            Return
          </p>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
