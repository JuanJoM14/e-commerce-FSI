
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { items } = await request.json();

  const line_items = items.map(item => ({
    price: item.priceId,
    quantity: item.quantity || 1,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items,
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cart',
  });

  return NextResponse.json({ url: session.url });
}
