"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";

function SuccessPage() {
  const [purchase, setPurchase] = useState(null);
  const { clearCartAfterSuccess } = useCart();

  useEffect(() => {
    const stored = localStorage.getItem("lastPurchase");
    if (stored) {
      const data = JSON.parse(stored);
      setPurchase(data);

      // 💡 Espera 5 segundos antes de limpiar carrito y resumen
      setTimeout(() => {
        clearCartAfterSuccess();
      }, 5000);
    }
  }, []);

  const total = purchase
    ? purchase.reduce((sum, item) => sum + item.price * item.quantity, 0) / 100
    : 0;

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-green-600 mb-2">¡Pago exitoso! 🎉</h1>
      <p className="mb-6">Gracias por tu compra. Aquí tienes tu resumen:</p>

      {!purchase ? (
        <p className="text-gray-500">No se pudo cargar el resumen de la compra.</p>
      ) : (
        <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
          {purchase.map((item, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span>{item.quantity} x {item.name}</span>
              <span>
                {(item.price / 100).toLocaleString("es-CO", {
                  style: "currency",
                  currency: item.currency,
                })}
              </span>
            </div>
          ))}
          <div className="text-right font-bold mt-4">
            Total: {total.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SuccessPage;