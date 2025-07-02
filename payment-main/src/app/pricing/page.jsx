"use client";

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { useEffect, useState } from "react";

function PricingPage() {
  const [prices, setPrices] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchPrices() {
      const res = await fetch("http://localhost:3000/api/prices");
      const data = await res.json();
      setPrices(data);
    }

    fetchPrices();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <div>
        <header>
          <h1 className="text-center my-5 text-2xl font-bold">Catálogo</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prices.map((price) => (
            <div key={price.id} className="bg-white p-4 rounded shadow-md border">
              {price.product.images?.[0] && (
                <img
                  src={price.product.images[0]}
                  alt={price.product.name}
                  className="w-full h-48 object-contain mb-3"
                />
              )}
              <h3 className="text-lg font-semibold mb-1">
                {price.product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {price.product.description}
              </p>
              <h2 className="text-xl font-bold mb-4">
                {(price.unit_amount / 100).toLocaleString("es-CO", {
                  style: "currency",
                  currency: price.currency,
                })}
              </h2>
              <button
                className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
                onClick={() =>
                  addToCart({
                    priceId: price.id,
                    name: price.product.name,
                    price: price.unit_amount,
                    currency: price.currency,
                    image: price.product.images?.[0] || null,
                  })
                }
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingPage;