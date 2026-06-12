"use client";

import { useEffect, useRef, useState } from "react";

export default function NewOrderPopup({ orders }: { orders: any[] }) {
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [orders.length]);

  useEffect(() => {
    if (pendingOrders.length > 0) {
      audioRef.current?.play().catch(() => {});
    }
  }, [pendingOrders.length]);

  const currentOrder = pendingOrders[currentIndex];

  const updateStatus = async (status: string) => {
    if (!currentOrder) return;

    const res = await fetch("/api/order-status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: currentOrder.id,
        status,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to update order");
      return;
    }

    window.location.href = "/dashboard";
  };

  if (!currentOrder) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/sounds/new-order.mp3"
        preload="auto"
      />

      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">
        <div className="bg-slate-950 border border-orange-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            🔔
          </div>

          <h2 className="text-3xl font-bold text-white text-center mb-2">
            New Order
          </h2>

          <p className="text-orange-400 font-bold text-center mb-2">
            Table {currentOrder.tableNo}
          </p>

          <p className="text-slate-400 text-center mb-4">
            Pending order {currentIndex + 1} of {pendingOrders.length}
          </p>

          <div className="space-y-2 mb-6">
            {currentOrder.items.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-slate-700 pb-2"
              >
                <span className="text-white">
                  {item.menuItem.name}
                </span>

                <span className="text-orange-400 font-bold">
                  x{item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => updateStatus("Preparing")}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold"
            >
              Accept
            </button>

            <button
              onClick={() => updateStatus("Rejected")}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
}