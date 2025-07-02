import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET() {
  try {
    const prices = await stripe.prices.list({
      expand: ["data.product"],
    });

    return NextResponse.json(prices.data);
  } catch (error) {
    console.error("Error en /api/prices:", error);
    return NextResponse.json({ error: "Error al obtener precios" }, { status: 500 });
  }
}
