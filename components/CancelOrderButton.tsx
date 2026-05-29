"use client";

export default function CancelOrderButton({ orderId }: { orderId: number }) {
  const cancelOrder = async () => {
    const confirmed = confirm("Are you sure you want to cancel this order?");

    if (!confirmed) return;

    const res = await fetch(`${window.location.origin}/api/cancel-order`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
      }),
    });

    if (res.ok) {
      alert("Order cancelled successfully");
      window.location.reload();
    } else {
      alert("Order cannot be cancelled now");
    }
  };

  return (
    <button
      onClick={cancelOrder}
      className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-bold mt-4"
    >
      Cancel Order
    </button>
  );
}
