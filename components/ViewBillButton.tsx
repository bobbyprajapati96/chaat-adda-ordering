"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

export default function ViewBillButton({ sessionId }: { sessionId?: number }) {
  const [showBill, setShowBill] = useState(false);
  const [bill, setBill] = useState<any>(null);

  const loadBill = async () => {
    if (!sessionId) {
      alert("Session not found");
      return;
    }

    const res = await fetch(`/api/session-bill?sessionId=${sessionId}`, {
      cache: "no-store",
    });

    const data = await res.json();

    setBill(data);
    setShowBill(true);
  };

  useEffect(() => {
    if (sessionId) {
      loadBill();
    }
  }, [sessionId]);

  return (
    <div className="mt-6">
      <button
        onClick={() => (showBill ? setShowBill(false) : loadBill())}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-bold"
      >
        {showBill ? "Hide Bill" : "View Bill"}
      </button>

      {showBill && bill && (
        <Card className="mt-4">
          <h2 className="text-2xl font-bold text-white mb-1">Final Bill</h2>

          <p className="text-slate-400 text-sm mb-4">
            {bill.ordersCount} order
            {bill.ordersCount > 1 ? "s" : ""} in this session
          </p>

          <div className="space-y-3">
            {bill.items.map((item: any) => (
              <div key={item.name} className="flex justify-between text-sm">
                <span className="text-slate-300">
                  {item.name} x {item.quantity}
                </span>

                <span className="text-white">₹{item.total}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-700 mt-4 pt-4 flex justify-between">
            <span className="text-slate-400 font-semibold">Total Amount</span>

            <span className="text-3xl font-bold text-orange-400">
              ₹{bill.totalAmount}
            </span>
          </div>
        </Card>
      )}
    </div>
  );
}
