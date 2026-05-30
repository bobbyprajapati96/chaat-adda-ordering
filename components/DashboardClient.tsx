"use client";

import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CloseSessionButton from "@/components/CloseSessionButton";
export default function DashboardClient({ orders }: { orders: any[] }) {
  const router = useRouter();

  const updateStatus = async (orderId: number, status: string) => {
    await fetch("/api/order-status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        status,
      }),
    });

    router.refresh();
  };

  return (
    <div className="grid gap-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Table {order.tableNo}
              </h2>

              <p className="text-slate-400">Order #{order.id}</p>
            </div>

            <div
              className={`px-4 py-2 rounded-xl font-semibold w-fit ${
                order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "Preparing"
                  ? "bg-blue-100 text-blue-700"
                  : order.status === "Ready To Serve"
                  ? "bg-orange-100 text-orange-700"
                  : order.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {order.status}
            </div>
          </div>

          <div className="space-y-3">
            {order.items.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-gray-200 pb-2"
              >
                <p className="text-white font-medium">{item.menuItem.name}</p>

                <p className="text-white font-semibold">x{item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button
              onClick={() => updateStatus(order.id, "Preparing")}
              variant="secondary"
            >
              Preparing
            </Button>
            <Button
              onClick={() => updateStatus(order.id, "Ready To Serve")}
              variant="primary"
            >
              Ready
            </Button>
            <Button
              onClick={() => updateStatus(order.id, "Completed")}
              variant="success"
            >
              Completed
            </Button>
            {order.status === "Completed" && (
              <CloseSessionButton sessionId={order.sessionId} />
            )}
            <Button
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
