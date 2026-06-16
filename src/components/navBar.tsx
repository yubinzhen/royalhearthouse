"use client";

import Image from "next/image";
import royalHeartHoseLogo from "@/public/royalHeartHouseLogo.webp";

type Lang = "en" | "zh";

type NavBarProps = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  cartCount: number;
  onCartClick: () => void;
};

export default function NavBar({ lang, setLang, cartCount, onCartClick }: NavBarProps) {
  return (
    <div className="z-50 flex h-16 items-center justify-between border-b border-gray-400 bg-white px-4 shadow-sm sm:h-20 sm:px-6">
      <a href="/" className="flex items-center gap-2 sm:gap-3">
        <Image
          className="h-9 w-9 rounded-lg shadow-sm sm:h-11 sm:w-11 md:h-13 md:w-13"
          src={royalHeartHoseLogo}
          alt="Royal Heart House Logo"
        />
        <div className="flex flex-col leading-tight">
          <p className="font-serif text-xs text-black italic sm:text-sm md:text-lg">
            Royal Heart House
          </p>
          <p className="text-royalheart-gold text-xs font-bold sm:text-sm md:text-base">
            御心屋
          </p>
        </div>
      </a>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="bg-royalheart-darkblush border-royalheart-cream flex scale-90 rounded-full border p-0.5 sm:scale-100">
          {(["en", "zh"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-2 py-1 text-xs font-bold transition-all duration-150 sm:px-3 sm:text-sm ${
                lang === l
                  ? "bg-royalheart-brown text-white shadow-sm"
                  : "hover:text-royalheart-brown text-royalheart-midtext"
              }`}
            >
              {l === "en" ? "EN" : "中文"}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onCartClick}
          className="bg-royalheart-gold hover:bg-royalheart-brown flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-md transition-all duration-150 hover:scale-105 active:scale-95 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
        >
          🛒
          <p className="hidden sm:inline">
            {lang === "en" ? "Cart" : "购物车"}
          </p>
          {cartCount > 0 && (
            <div className="text-royalheart-gold flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-black sm:h-5 sm:w-5 sm:text-xs">
              {cartCount}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
