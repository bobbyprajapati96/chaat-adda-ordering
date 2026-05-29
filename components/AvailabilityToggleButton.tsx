"use client";

import { useRouter } from "next/navigation";

export default function AvailabilityToggleButton({
  id,
  available,
}: {
  id: number;
  available: boolean;
}) {
  const router = useRouter();

  const toggleAvailability = async () => {
    await fetch("/api/menu-item", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        available: !available,
      }),
    });

    router.refresh();
  };

  return (
    <button
      onClick={toggleAvailability}
      className={`px-4 py-2 rounded-xl text-white ${
        available ? "bg-green-500" : "bg-gray-500"
      }`}
    >
      {available ? "Available" : "Unavailable"}
    </button>
  );
}
