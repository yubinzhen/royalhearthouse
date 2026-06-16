import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY in environment variables." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2026-05-27.dahlia",
  });

  const body = await request.json();
  const { cartItems, pickupInfo } = body as {
    cartItems: Array<{
      key: string;
      product: { name_en: string; desc_en: string };
      size: { id: string; label_en: string; price: number };
      quantity: number;
    }>;
    pickupInfo: {
      name: string;
      phone: string;
      email: string;
      pickupDate: string;
      pickupTime: string;
      note: string;
    };
  };

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return NextResponse.json(
      { error: "Cart is empty. Add items before checking out." },
      { status: 400 }
    );
  }

  if (!pickupInfo?.name || !pickupInfo?.phone || !pickupInfo?.pickupDate || !pickupInfo?.pickupTime) {
    return NextResponse.json(
      { error: "Pickup name, phone, date, and time are required." },
      { status: 400 }
    );
  }

  const line_items = cartItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: `${item.product.name_en} (${item.size.label_en})`,
        description: item.product.desc_en,
      },
      unit_amount: Math.round(item.size.price * 100),
    },
    quantity: item.quantity,
  }));

  const origin = request.headers.get("origin") || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items,
    metadata: {
      pickup_name: pickupInfo.name,
      pickup_phone: pickupInfo.phone,
      pickup_email: pickupInfo.email || "",
      pickup_date: pickupInfo.pickupDate,
      pickup_time: pickupInfo.pickupTime,
      pickup_note: pickupInfo.note || "",
    },
    customer_email: pickupInfo.email || undefined,
    success_url: `${origin}/?success=true`,
    cancel_url: `${origin}/?canceled=true`,
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Could not create checkout session." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: session.url });
}
