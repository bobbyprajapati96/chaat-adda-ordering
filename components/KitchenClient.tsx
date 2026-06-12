"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function KitchenClient({ orders }: { orders: any[] }) {
  const [localOrders, setLocalOrders] = useState(orders);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const updateStatus = async (orderId: number, status: string) => {
    setLoadingId(orderId);

    setLocalOrders((current) =>
      current
        .map((order) => (order.id === orderId ? { ...order, status } : order))
        .filter((order) =>
          ["Pending", "Preparing", "Ready To Serve"].includes(order.status)
        )
    );

    const res = await fetch("/api/order-status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        status,
      }),
    });

    if (!res.ok) {
      alert("Failed to update order");
    }

    setLoadingId(null);
  };

  const activeOrders = localOrders.filter((order) =>
    ["Pending", "Preparing", "Ready To Serve"].includes(order.status)
  );

  if (activeOrders.length === 0) {
    return (
      <Card className="text-center">
        <h2 className="text-2xl font-bold text-white">
          No active kitchen orders
        </h2>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {["Pending", "Preparing", "Ready To Serve"].map((status) => (
        <div key={status}>
          <h2 className="text-2xl font-bold text-white mb-4">{status}</h2>

          <div className="space-y-4">
            {activeOrders
              .filter((order) => order.status === status)
              .map((order) => (
                <Card key={order.id}>
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Table {order.tableNo}
                      </h3>
                      <p className="text-slate-400">Order #{order.id}</p>
                    </div>

                    <span className="text-orange-400 font-bold">
                      {loadingId === order.id ? "Updating..." : order.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-5">
                    {order.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex justify-between border-b border-slate-700 pb-2"
                      >
                        <span className="text-white font-semibold">
                          {item.menuItem.name}
                        </span>
                        <span className="text-orange-400 font-bold">
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3">
                    {order.status === "Pending" && (
                      <Button
                        disabled={loadingId === order.id}
                        onClick={() => updateStatus(order.id, "Preparing")}
                        variant="secondary"
                        className="w-full"
                      >
                        Start Preparing
                      </Button>
                    )}

                    {order.status === "Preparing" && (
                      <Button
                        disabled={loadingId === order.id}
                        onClick={() => updateStatus(order.id, "Ready To Serve")}
                        variant="primary"
                        className="w-full"
                      >
                        Mark Ready
                      </Button>
                    )}

                    {order.status === "Ready To Serve" && (
                      <Button
                        disabled={loadingId === order.id}
                        onClick={() => updateStatus(order.id, "Completed")}
                        variant="success"
                        className="w-full"
                      >
                        Complete Order
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
