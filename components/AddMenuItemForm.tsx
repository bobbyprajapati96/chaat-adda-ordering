"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMenuItemForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/menu-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      price: "",
      category: "",
      image: "",
    });

    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow mb-8 grid gap-4"
    >
      <h2 className="text-2xl font-bold text-black">
        Add New Menu Item
      </h2>

      <input
        placeholder="Item name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="border p-3 rounded-xl text-black"
        required
      />

      <input
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
        className="border p-3 rounded-xl text-black"
        required
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
        className="border p-3 rounded-xl text-black"
        required
      />

      <input
        placeholder="Image path e.g. /images/pizza.jpg"
        value={form.image}
        onChange={(e) =>
          setForm({ ...form, image: e.target.value })
        }
        className="border p-3 rounded-xl text-black"
        required
      />

      <button className="bg-black text-white py-3 rounded-xl">
        Add Item
      </button>
    </form>
  );
}