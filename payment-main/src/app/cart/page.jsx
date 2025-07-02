"use client";

import { useCart } from "@/app/context/CartContext";

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) / 100;

const handleCheckout = async () => {
  // Guardamos en historial
  const historial = JSON.parse(localStorage.getItem("purchaseHistory") || "[]");

  const compra = {
    id: `compra_${Date.now()}`,
    fecha: new Date().toISOString(),
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };

  historial.push(compra);
  localStorage.setItem("purchaseHistory", JSON.stringify(historial));

  // ⚠️ Guardar también la compra actual como resumen
  localStorage.setItem("lastPurchase", JSON.stringify(cart));

  // Iniciar checkout
  const res = await fetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify({
      items: cart.map((item) => ({
        priceId: item.priceId,
        quantity: item.quantity,
      })),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">🛒 Tu carrito</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.priceId} className="flex items-center justify-between bg-gray-100 p-4 rounded shadow">
              <div className="flex items-center gap-4">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                )}
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>
                    {item.quantity} x {(item.price / 100).toLocaleString("es-CO", {
                      style: "currency",
                      currency: item.currency,
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.priceId)}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                X
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-xl font-bold mb-2">
              Total: {total.toLocaleString("es-CO", { style: "currency", currency: "COP" })}
            </h3>

            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mr-2"
            >
              Pagar
            </button>
            <button
              onClick={clearCart}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;