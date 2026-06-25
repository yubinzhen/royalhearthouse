import { useState } from "react";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { Product, Size } from "./productCard";
import ProductCard from "./productCard";

type Lang = "en" | "zh";

interface MenuGridProps {
  lang: Lang;
  onAdd: (product: Product, size: Size) => void;
}

export default function MenuGrid({ lang, onAdd }: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const t = (en: string, zh: string) => (lang === "en" ? en : zh);

  const filtered =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div id="menu" className="mx-auto mb-8 max-w-6xl px-15 py-12">
      <div className="mb-6">
        <p className="text-royalheart-gold mb-1 text-xs font-black tracking-[0.2em] uppercase">
          {t("Our Menu", "我们的菜单")}
        </p>
        <div className="text-royalheart-brown font-serif text-3xl">
          {t("Fresh & Made to Order", "新鲜现做")}
        </div>
      </div>

      <div className="scrollbar-hide mb-8 flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-shrink-0 rounded-full border px-5 py-2 text-sm font-bold transition-all duration-150 ${
              activeCategory === cat.id
                ? "bg-royalheart-brown text-white shadow"
                : "bg-royalheart-cream border-royalheart-blush hover:border-royalheart-lightgold hover:text-royalheart-lightgold"
            }`}
          >
            {t(cat.label_en, cat.label_zh)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            lang={lang}
            onAdd={onAdd}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-gray-300">
          {t("No items in this category.", "此分类暂无商品。")}
        </p>
      )}
    </div>
  );
}
