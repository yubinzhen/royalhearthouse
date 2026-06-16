import { Product, Size } from "./productCard";

type Lang = "en" | "zh";

type CartItem = {
  key: string;
  product: Product;
  size: Size;
  quantity: number;
};

type PickupInfo = {
  name: string;
  phone: string;
  email: string;
  pickupDate: string;
  pickupTime: string;
  note: string;
};

interface CartDrawerProps {
  lang: Lang;
  open: boolean;
  cartItems: CartItem[];
  subtotal: number;
  pickupInfo: PickupInfo;
  isCheckingOut: boolean;
  checkoutError: string | null;
  onItemQtyChange: (key: string, quantity: number) => void;
  onRemoveItem: (key: string) => void;
  onPickupChange: (field: keyof PickupInfo, value: string) => void;
  onCheckout: () => void;
  onClose: () => void;
}

const t = (lang: Lang, en: string, zh: string) => (lang === "en" ? en : zh);

export default function CartDrawer({
  lang,
  open,
  cartItems,
  subtotal,
  pickupInfo,
  isCheckingOut,
  checkoutError,
  onItemQtyChange,
  onRemoveItem,
  onPickupChange,
  onCheckout,
  onClose,
}: CartDrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-stretch">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative ml-auto h-full w-full max-w-md overflow-auto bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-royalheart-gold text-xs font-black uppercase tracking-[0.2em]">
              {t(lang, "Order Cart", "订单购物车")}
            </p>
            <h2 className="text-royalheart-brown font-serif text-3xl">
              {t(lang, "Pickup Order", "到店取货")}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-royalheart-brown bg-white px-3 py-2 text-sm font-bold text-royalheart-brown transition hover:bg-royalheart-cream"
          >
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-royalheart-lightgold bg-royalheart-cream p-6 text-center text-sm text-royalheart-brown">
            {t(lang, "Your cart is empty. Add something delicious!", "购物车为空，先添加美味商品吧！")}
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.key}
                className="rounded-3xl border border-royalheart-lightgold bg-royalheart-cream p-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name_en}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-text">
                      {t(lang, item.product.name_en, item.product.name_zh)}
                    </div>
                    <div className="text-[0.78rem] text-gray-500">
                      {t(lang, item.size.label_en, item.size.label_zh)} × ${item.size.price}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onItemQtyChange(item.key, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="rounded-full border border-royalheart-brown px-3 py-1 text-sm font-bold text-royalheart-brown disabled:opacity-50"
                      >
                        −
                      </button>
                      <span className="min-w-[28px] text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onItemQtyChange(item.key, item.quantity + 1)}
                        className="rounded-full bg-royalheart-brown px-3 py-1 text-sm font-bold text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.key)}
                    className="text-xs font-bold uppercase tracking-[0.2em] text-royalheart-gold"
                  >
                    {t(lang, "Remove", "移除")}
                  </button>
                </div>
              </div>
            ))}

            <div className="rounded-3xl border border-royalheart-lightgold bg-white p-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{t(lang, "Subtotal", "小计")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-dashed border-royalheart-lightgold pt-3 text-base font-semibold text-royalheart-brown">
                <span>{t(lang, "Total", "总计")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-royalheart-lightgold bg-royalheart-cream p-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-royalheart-gold">
                  {t(lang, "Name", "姓名")}
                </label>
                <input
                  type="text"
                  value={pickupInfo.name}
                  onChange={(event) => onPickupChange("name", event.target.value)}
                  placeholder={t(lang, "Full name", "您的姓名")}
                  className="w-full rounded-2xl border border-royalheart-brown bg-white px-4 py-3 text-sm text-text outline-none focus:border-royalheart-brown"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-royalheart-gold">
                    {t(lang, "Phone", "电话")}
                  </label>
                  <input
                    type="tel"
                    value={pickupInfo.phone}
                    onChange={(event) => onPickupChange("phone", event.target.value)}
                    placeholder={t(lang, "Phone number", "电话号码")}
                    className="w-full rounded-2xl border border-royalheart-brown bg-white px-4 py-3 text-sm text-text outline-none focus:border-royalheart-brown"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-royalheart-gold">
                    {t(lang, "Email", "电子邮箱")}
                  </label>
                  <input
                    type="email"
                    value={pickupInfo.email}
                    onChange={(event) => onPickupChange("email", event.target.value)}
                    placeholder={t(lang, "Email address", "电子邮箱")}
                    className="w-full rounded-2xl border border-royalheart-brown bg-white px-4 py-3 text-sm text-text outline-none focus:border-royalheart-brown"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-royalheart-gold">
                    {t(lang, "Pickup date", "取货日期")}
                  </label>
                  <input
                    type="date"
                    value={pickupInfo.pickupDate}
                    onChange={(event) => onPickupChange("pickupDate", event.target.value)}
                    className="w-full rounded-2xl border border-royalheart-brown bg-white px-4 py-3 text-sm text-text outline-none focus:border-royalheart-brown"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-royalheart-gold">
                    {t(lang, "Pickup time", "取货时间")}
                  </label>
                  <input
                    type="time"
                    value={pickupInfo.pickupTime}
                    onChange={(event) => onPickupChange("pickupTime", event.target.value)}
                    className="w-full rounded-2xl border border-royalheart-brown bg-white px-4 py-3 text-sm text-text outline-none focus:border-royalheart-brown"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-royalheart-gold">
                  {t(lang, "Order note", "订单备注")}
                </label>
                <textarea
                  value={pickupInfo.note}
                  onChange={(event) => onPickupChange("note", event.target.value)}
                  placeholder={t(lang, "Any instructions for pickup", "取货说明，例如提前几分钟到店")}
                  className="min-h-[100px] w-full rounded-2xl border border-royalheart-brown bg-white px-4 py-3 text-sm text-text outline-none focus:border-royalheart-brown"
                />
              </div>
            </div>

            {checkoutError && (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {checkoutError}
              </div>
            )}

            <button
              type="button"
              onClick={onCheckout}
              disabled={isCheckingOut || cartItems.length === 0}
              className="w-full rounded-full bg-royalheart-brown px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-royalheart-lightgold disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCheckingOut
                ? t(lang, "Processing payment…", "处理中…")
                : t(lang, "Pay with Stripe", "Stripe 支付")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
