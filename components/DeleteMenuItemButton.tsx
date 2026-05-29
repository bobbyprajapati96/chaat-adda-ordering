"use client";

import { useRouter } from "next/navigation";

export default function DeleteMenuItemButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Delete this menu item?");

    if (!confirmed) return;

    await fetch("/api/menu-item", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded-xl"
    >
      Delete
    </button>
  );
}
