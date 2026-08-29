import Hero from "./Hero";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#1a1c1c]">
      <Hero />
      <Footer />
    </div>
  );
}

