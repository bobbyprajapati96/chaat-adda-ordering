"use client";

import { useEffect, useRef, useState } from "react";

export default function OrderStatusNotifier({
  orderId,
  initialStatus,
}: {
  orderId: number;
  initialStatus: string;
}) {
  const [popupMessage, setPopupMessage] = useState("");
  const lastStatusRef = useRef(initialStatus);
  const popupOpenRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (popupOpenRef.current) return;

      const res = await fetch(`/api/order/${orderId}`, {
        cache: "no-store",
      });

      const data = await res.json();

      const oldStatus = lastStatusRef.current;
      const newStatus = data.status;

      if (oldStatus !== newStatus) {
        if (newStatus === "Preparing") {
          popupOpenRef.current = true;
          setPopupMessage("Your order is now being prepared.");
        }

        if (
          newStatus === "Ready To Serve" ||
          newStatus === "Completed" ||
          newStatus === "Ready"
        ) {
          popupOpenRef.current = true;
          setPopupMessage("Your order is ready and will be served soon.");
        }
      }

      lastStatusRef.current = newStatus;
    }, 3000);

    return () => clearInterval(interval);
  }, [orderId]);

  const closePopup = () => {
    popupOpenRef.current = false;
    setPopupMessage("");
  };

  return (
    <>
      {popupMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-black mb-4">
              Order Update 🎉
            </h2>

            <p className="text-gray-600 mb-6">{popupMessage}</p>

            <button
              onClick={closePopup}
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
}
