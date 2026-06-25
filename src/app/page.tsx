"use client";

import { useEffect, useMemo, useState } from "react";
import NavBar from "@/components/navBar";
import Landing from "@/components/landing";
import MenuGrid from "@/components/menu";
import CartDrawer from "@/components/cartDrawer";
import Footer from "@/components/footer";
import { Product, Size } from "@/components/productCard";

type PickupInfo = {
  name: string;
  phone: string;
  email: string;
  pickupDate: string;
  pickupTime: string;
  note: string;
};

type CartItem = {
  key: string;
  product: Product;
  size: Size;
  quantity: number;
};

const defaultPickupInfo: PickupInfo = {
  name: "",
  phone: "",
  email: "",
  pickupDate: "",
  pickupTime: "",
  note: "",
};

const Home = () => {
  const [lang, setLang] = useState<"en" | "zh">("en");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [pickupInfo, setPickupInfo] = useState<PickupInfo>(defaultPickupInfo);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSuccess(params.get("success") === "true");
    setCanceled(params.get("canceled") === "true");
  }, []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.size.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const cartItemCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems],
  );

  const handleAdd = (product: Product, size: Size) => {
    const itemKey = `${product.id}-${size.id}`;
    setCartItems((current) => {
      const existing = current.find((item) => item.key === itemKey);
      if (existing) {
        return current.map((item) =>
          item.key === itemKey
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...current, { key: itemKey, product, size, quantity: 1 }];
    });
  };

  const handleItemQtyChange = (key: string, quantity: number) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.key === key
            ? { ...item, quantity: Math.max(1, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((current) => current.filter((item) => item.key !== key));
  };

  const handlePickupChange = (field: keyof PickupInfo, value: string) => {
    setPickupInfo((current) => ({ ...current, [field]: value }));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setCheckoutError("Please add at least one item to your cart.");
      return;
    }

    if (
      !pickupInfo.name ||
      !pickupInfo.phone ||
      !pickupInfo.pickupDate ||
      !pickupInfo.pickupTime
    ) {
      setCheckoutError(
        "Please fill in your pickup name, phone, date, and time.",
      );
      return;
    }

    setCheckoutError(null);
    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems, pickupInfo }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        setCheckoutError(data.error ?? "Failed to create checkout session.");
        setIsCheckingOut(false);
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      setCheckoutError("Unable to start Stripe checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };

  return (
    <div>
      <NavBar
        lang={lang}
        setLang={setLang}
        cartCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      <Landing lang={lang} />
      <MenuGrid lang={lang} onAdd={handleAdd} />

      <CartDrawer
        lang={lang}
        open={isCartOpen}
        cartItems={cartItems}
        subtotal={subtotal}
        pickupInfo={pickupInfo}
        isCheckingOut={isCheckingOut}
        checkoutError={checkoutError}
        onItemQtyChange={handleItemQtyChange}
        onRemoveItem={handleRemoveItem}
        onPickupChange={handlePickupChange}
        onCheckout={handleCheckout}
        onClose={() => setIsCartOpen(false)}
      />

      {success && (
        <div className="mx-auto mb-8 max-w-6xl px-15">
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-700">
            {lang === "en"
              ? "Your order is confirmed! Please bring your pickup confirmation to the store."
              : "订单已确认！请携带取货确认到店取货。"}
          </div>
        </div>
      )}
      {canceled && (
        <div className="mx-auto mb-8 max-w-6xl px-15">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-700">
            {lang === "en"
              ? "Payment was canceled. You can update your cart and try again."
              : "支付已取消。您可以修改购物车后重试。"}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
