"use client";

import { useRouter } from "next/navigation";

export default function EditMenuItemButton({ item }: { item: any }) {
  const router = useRouter();

  const handleEdit = async () => {
    const name = prompt("Item name", item.name);
    const price = prompt("Price", item.price);
    const category = prompt("Category", item.category);
    const image = prompt("Image path", item.image);

    if (!name || !price || !category || !image) return;

    await fetch("/api/menu-item", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        name,
        price,
        category,
        image,
      }),
    });

    router.refresh();
  };

  return (
    <button
      onClick={handleEdit}
      className="bg-blue-500 text-white px-4 py-2 rounded-xl"
    >
      Edit
    </button>
  );
}
