"use client";

import { useRouter } from "next/navigation";

export default function PendingOrdersQueue({ orders }: { orders: any[] }) {
  const router = useRouter();

  const pendingOrders = orders.filter((order) => order.status === "Pending");

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

  if (pendingOrders.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold text-white mb-4">
        Pending Orders Queue
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {pendingOrders.map((order) => (
          <div
            key={order.id}
            className="bg-yellow-50 border border-yellow-300 rounded-2xl p-5 shadow"
          >
            <div className="flex justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Table {order.tableNo}
                </h3>
                <p className="text-gray-600">Order #{order.id}</p>
              </div>

              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-xl h-fit">
                Pending
              </span>
            </div>

            <div className="space-y-2 mb-5">
              {order.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-2"
                >
                  <span className="text-white">{item.menuItem.name}</span>
                  <span className="text-white">x{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => updateStatus(order.id, "Preparing")}
                className="flex-1 bg-green-500 text-white py-2 rounded-xl"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(order.id, "Rejected")}
                className="flex-1 bg-red-500 text-white py-2 rounded-xl"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
