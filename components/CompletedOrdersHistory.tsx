"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

export default function CompletedOrdersHistory({ orders }: { orders: any[] }) {
  const [open, setOpen] = useState(false);

  const completedOrders = orders.filter((order) =>
    ["Completed", "Cancelled", "Rejected"].includes(order.status)
  );

  if (completedOrders.length === 0) return null;

  return (
    <Card className="mt-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center"
      >
        <div className="text-left">
          <h2 className="text-2xl font-bold text-white">
            Completed / Closed Orders
          </h2>

          <p className="text-slate-400 text-sm">
            {completedOrders.length} closed order
            {completedOrders.length > 1 ? "s" : ""}
          </p>
        </div>

        <span className="text-orange-400 font-bold">
          {open ? "Hide" : "View"}
        </span>
      </button>

      {open && (
        <div className="mt-5 space-y-3">
          {completedOrders.map((order) => (
            <div key={order.id} className="bg-slate-800 rounded-2xl p-4">
              <div className="flex justify-between mb-3">
                <div>
                  <p className="text-white font-bold">Order #{order.id}</p>

                  <p className="text-slate-400 text-sm">
                    Table {order.tableNo}
                  </p>
                </div>

                <span className="text-sm font-bold text-orange-400">
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
