"use client";

import { useState } from "react";
import NavBar from "@/components/navBar";
import Landing from "@/components/landing";
import MenuGrid from "@/components/menu";
import Footer from "@/components/footer";

const Home = () => {
  const [lang, setLang] = useState<"en" | "zh">("en");

  return (
    <div>
      <NavBar lang={lang} setLang={setLang} />
      <Landing lang={lang} />
      <MenuGrid lang={lang} onAdd={() => {}} />
      <Footer />
    </div>
  );
};

export default Home;
