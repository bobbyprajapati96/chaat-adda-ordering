"use client";

import { useEffect, useState } from "react";

export default function NewOrderPopup({ orders }: { orders: any[] }) {
  const pendingOrders = orders.filter((order) => order.status === "Pending");

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [orders.length]);

  const currentOrder = pendingOrders[currentIndex];

  const updateStatus = async (status: string) => {
    if (!currentOrder) return;

    await fetch("/api/order-status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: currentOrder.id,
        status,
      }),
    });

    window.location.reload();
  };

  if (!currentOrder) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
        <h2 className="text-3xl font-bold text-black mb-2">New Order 🚨</h2>

        <p className="text-gray-600 mb-2">Table {currentOrder.tableNo}</p>

        <p className="text-gray-500 mb-4">
          Pending order {currentIndex + 1} of {pendingOrders.length}
        </p>

        <div className="space-y-2 mb-6">
          {currentOrder.items.map((item: any) => (
            <div key={item.id} className="flex justify-between border-b pb-2">
              <span className="text-black">{item.menuItem.name}</span>
              <span className="text-black">x{item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => updateStatus("Preparing")}
            className="flex-1 bg-green-500 text-white py-3 rounded-xl"
          >
            Accept
          </button>

          <button
            onClick={() => updateStatus("Rejected")}
            className="flex-1 bg-red-500 text-white py-3 rounded-xl"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
