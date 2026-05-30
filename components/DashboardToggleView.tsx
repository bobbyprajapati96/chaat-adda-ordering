"use client";

import { useState } from "react";
import AnalyticsCards from "@/components/AnalyticsCards";
import PendingOrdersQueue from "@/components/PendingOrdersQueue";
import DashboardClient from "@/components/DashboardClient";
import Card from "@/components/ui/Card";
import CompletedOrdersHistory from "@/components/CompletedOrdersHistory";

export default function DashboardToggleView({
  orders,
  assistanceRequests,
}: {
  orders: any[];
  assistanceRequests: any[];
}) {
  const [view, setView] = useState<"orders" | "sales">("orders");

  return (
    <div>
      <Card className="mb-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setView("orders")}
            className={`py-3 rounded-2xl font-bold ${
              view === "orders"
                ? "bg-orange-500 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            Orders View
          </button>

          <button
            onClick={() => setView("sales")}
            className={`py-3 rounded-2xl font-bold ${
              view === "sales"
                ? "bg-orange-500 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            Sales View
          </button>
        </div>
      </Card>

      {view === "orders" && (
        <>
          <PendingOrdersQueue orders={orders} />
          <DashboardClient orders={orders} />
          <CompletedOrdersHistory orders={orders} />
        </>
      )}

      {view === "sales" && <AnalyticsCards orders={orders} />}
    </div>
  );
}
