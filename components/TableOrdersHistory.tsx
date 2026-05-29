"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

export default function TableOrdersHistory({ tableNo }: { tableNo: number }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const fetchOrders = async () => {
    const res = await fetch(`/api/table-orders?tableNo=${tableNo}`, {
      cache: "no-store",
    });

    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);

    return () => clearInterval(interval);
  }, [tableNo]);

  if (orders.length === 0) return null;

  return (
    <Card className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center"
      >
        <div className="text-left">
          <h2 className="text-lg font-bold text-white">Your Table Orders</h2>

          <p className="text-slate-400 text-sm">
            {orders.length} recent order
            {orders.length > 1 ? "s" : ""}
          </p>
        </div>

        <span className="text-orange-400 font-bold">
          {open ? "Hide" : "View"}
        </span>
      </button>

      {open && (
        <div className="mt-4 space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-slate-800 rounded-2xl p-3">
              <div className="flex justify-between mb-2">
                <p className="text-white font-bold">Order #{order.id}</p>

                <span className="text-orange-400 text-sm font-bold">
                  {order.status}
                </span>
              </div>

              <div className="space-y-1">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-300">{item.menuItem.name}</span>

                    <span className="text-slate-400">x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
