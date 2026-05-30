"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CloseSessionButton from "@/components/CloseSessionButton";

export default function DashboardClient({ orders }: { orders: any[] }) {
  const [localOrders, setLocalOrders] = useState(orders);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const updateStatus = async (orderId: number, status: string) => {
    const previousOrders = localOrders;

    setLoadingId(orderId);

    setLocalOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
            }
          : order
      )
    );

    try {
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
        setLocalOrders(previousOrders);
        alert("Failed to update status");
      }
    } catch {
      setLocalOrders(previousOrders);
      alert("Network error");
    } finally {
      setLoadingId(null);
    }
  };

  const statusClass = (status: string) => {
    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Preparing") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "Ready To Serve") {
      return "bg-orange-100 text-orange-700";
    }

    if (status === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="grid gap-6">
      {localOrders
        .filter((order) =>
          ["Pending", "Preparing", "Ready To Serve"].includes(order.status)
        )
        .map((order) => (
          <Card key={order.id}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Table {order.tableNo}
                </h2>

                <p className="text-slate-400">Order #{order.id}</p>
              </div>

              <div
                className={`px-4 py-2 rounded-xl font-semibold w-fit ${statusClass(
                  order.status
                )}`}
              >
                {loadingId === order.id ? "Updating..." : order.status}
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b border-slate-700 pb-2"
                >
                  <p className="text-white font-medium">{item.menuItem.name}</p>

                  <p className="text-white font-semibold">x{item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Button
                disabled={loadingId === order.id}
                onClick={() => updateStatus(order.id, "Preparing")}
                variant="secondary"
              >
                Preparing
              </Button>

              <Button
                disabled={loadingId === order.id}
                onClick={() => updateStatus(order.id, "Ready To Serve")}
                variant="primary"
              >
                Ready
              </Button>

              <Button
                disabled={loadingId === order.id}
                onClick={() => updateStatus(order.id, "Completed")}
                variant="success"
              >
                Completed
              </Button>

              {order.status === "Completed" && order.sessionId && (
                <CloseSessionButton sessionId={order.sessionId} />
              )}

              <Button
                disabled={loadingId === order.id}
                onClick={() => updateStatus(order.id, "Rejected")}
                variant="danger"
              >
                Reject
              </Button>
            </div>
          </Card>
        ))}
    </div>
  );
}
