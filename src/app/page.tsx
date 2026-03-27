"use client";

import { useState } from "react";
import NavBar from "@/components/navBar";
import Landing from "@/components/landing";

const Home = () => {
  const [lang, setLang] = useState<"en" | "zh">("en");

  return (
    <div>
      <NavBar lang={lang} setLang={setLang} />
      <Landing lang={lang} />
    </div>
  );
};

export default Home;
