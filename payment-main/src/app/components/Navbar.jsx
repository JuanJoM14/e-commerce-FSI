"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-sky-700 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link href="/pricing" className="text-xl font-bold hover:underline">
        🛍️ Catálogo
      </Link>
      <Link href="/cart" className="relative font-semibold hover:underline">
        🛒 Carrito
        {totalItems > 0 && (
          <span className="ml-2 bg-white text-sky-700 rounded-full px-2 text-xs font-bold">
            {totalItems}
          </span>
        )}
      </Link>
      <Link
        href="/history"
        className="text-white hover:text-yellow-300 font-semibold transition-colors"
      >
        📜 Historial
      </Link>
    </nav>
  );
}

export default Navbar;