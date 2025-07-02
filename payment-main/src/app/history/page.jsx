"use client";

import { useEffect, useState } from "react";

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("purchaseHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  if (history.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">📜 Historial de Compras</h1>
        <p>No hay compras registradas.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">📜 Historial de Compras</h1>
      <div className="space-y-6">
        {history.map((compra) => (
          <div key={compra.id} className="border p-4 rounded shadow">
            <h2 className="font-bold text-lg mb-2">Fecha: {new Date(compra.fecha).toLocaleString("es-CO")}</h2>
            <ul className="space-y-1">
              {compra.items.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{item.quantity} x {item.name}</span>
                  <span>
                    {(item.price / 100).toLocaleString("es-CO", {
                      style: "currency",
                      currency: item.currency,
                    })}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-2 font-bold text-right">
              Total: {(compra.total/100).toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;
