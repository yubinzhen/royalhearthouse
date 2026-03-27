"use client";

import { useState } from "react";
import Image from "next/image";

import royalHeartHoseLogo from "@/public/royalHeartHouseLogo.webp";

type Lang = "en" | "zh";

export default function NavBar() {
  const [lang, setLang] = useState<Lang>("en");
  const [cartCount] = useState(0);

  return (
    <div className="border-royalheart-cream z-50 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm sm:h-20 sm:px-6">
      <a href="/" className="flex items-center gap-2 sm:gap-3">
        <Image
          className="h-9 w-9 rounded-lg shadow-sm sm:h-11 sm:w-11 md:h-13 md:w-13"
          src={royalHeartHoseLogo}
          alt="Royal Heart House Logo"
        />
        <div className="flex flex-col leading-tight">
          <p className="text-royalheart-darkbrown font-serif text-xs italic sm:text-sm md:text-lg">
            Royal Heart House
          </p>
          <p className="text-royalheart-gold text-xs font-bold sm:text-sm md:text-base">
            御心屋
          </p>
        </div>
      </a>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="bg-royalheart-darkcream border-royalheart-blush flex scale-90 rounded-full border p-0.5 sm:scale-100">
          {(["en", "zh"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-2 py-1 text-xs font-bold transition-all duration-150 sm:px-3 sm:text-sm ${
                lang === l
                  ? "bg-amber-800 text-white shadow-sm"
                  : "hover:text-royalheart-brown text-amber-700"
              }`}
            >
              {l === "en" ? "EN" : "中文"}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-md transition-all duration-150 hover:scale-105 hover:bg-amber-800 active:scale-95 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
          🛒
          <p className="xs:inline hidden sm:inline">
            {lang === "en" ? "Cart" : "购物车"}
          </p>
          {cartCount > 0 && (
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-black text-amber-500 sm:h-5 sm:w-5 sm:text-xs">
              {cartCount}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
