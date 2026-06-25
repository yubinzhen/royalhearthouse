import { useState } from "react";

type Lang = "en" | "zh";

export interface Size {
  id: string;
  label_en: string;
  label_zh: string;
  price: number;
}

export interface Product {
  id: number;
  category: string;
  image: string;
  name_en: string;
  name_zh: string;
  desc_en: string;
  desc_zh: string;
  sizes: Size[];
  badge_en?: string;
  badge_zh?: string;
}

interface ProductCardProps {
  product: Product;
  lang: Lang;
  onAdd: (product: Product, size: Size) => void;
}

export default function ProductCard({
  product,
  lang,
  onAdd,
}: ProductCardProps) {
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);
  const [popped, setPopped] = useState(false);

  const t = (en: string, zh: string) => (lang === "en" ? en : zh);
  const size = product.sizes[selectedSizeIdx];

  function handleAdd() {
    onAdd(product, size);
    setPopped(true);
    setTimeout(() => setPopped(false), 500);
  }

  return (
    <div className="hover:border-blush relative flex flex-col overflow-hidden rounded-2xl border border-transparent bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      {product.badge_en && (
        <div className="bg-royalheart-gold absolute top-2.5 right-2.5 z-10 rounded-full px-2.5 py-0.5 text-[0.65rem] font-black tracking-wide text-white shadow">
          {t(product.badge_en, product.badge_zh ?? "")}
        </div>
      )}

      <div className="bg-royalheart-lightblush h-64 w-full">
        <img
          src={product.image}
          alt={t(product.name_en, product.name_zh)}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="text-text font-serif text-base">
          {t(product.name_en, product.name_zh)}
        </div>
        <p className="text-text-light mb-2 text-[0.72rem]">
          {t(product.name_zh, product.name_en)}
        </p>
        <p className="mb-4 flex-1 text-[0.75rem] leading-relaxed text-gray-400">
          {t(product.desc_en, product.desc_zh)}
        </p>

        <div className="flex items-center justify-between gap-2">
          {product.sizes.length > 1 ? (
            <select
              value={selectedSizeIdx}
              onChange={(e) => setSelectedSizeIdx(Number(e.target.value))}
              className="bg-royalheart-cream text-royalheart-gold border-royalheart-blush text-text-mid focus:border-gold max-w-[130px] rounded-lg border px-2 py-1.5 text-[0.75rem] font-bold focus:outline-none"
            >
              {product.sizes.map((s, i) => (
                <option key={s.id} value={i}>
                  {t(s.label_en, s.label_zh)} — ${s.price}
                </option>
              ))}
            </select>
          ) : (
            <div className="text-royalheart-gold text-base font-semibold">
              ${size.price}
            </div>
          )}

          <button
            onClick={handleAdd}
            className={`bg-royalheart-brown hover:bg-royalheart-lightgold flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.8rem] font-bold text-white transition-all duration-150 active:scale-95 ${
              popped ? "scale-110" : ""
            }`}
          >
            <div className="text-base leading-none">+</div>
            <div>{t("Add", "加入")}</div>
          </button>
        </div>
      </div>
    </div>
  );
}
