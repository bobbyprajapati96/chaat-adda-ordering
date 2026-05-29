"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function MenuClient({
  menuItems,
  tableNo,
}: {
  menuItems: any[];
  tableNo: number;
}) {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    document.body.style.overflow = showCart ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showCart]);

  const categories = [
    "All",
    ...Array.from(new Set(menuItems.map((item) => item.category))),
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: any) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const sendAssistanceRequest = async (requestType: string) => {
    await fetch("/api/assistance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableNo,
        request: requestType,
      }),
    });

    alert(`${requestType} request sent`);
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Please add at least one item");
      return;
    }

    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableNo,
        cart,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      alert("Order placed successfully!");
      setCart([]);
      setShowCart(false);

      window.location.href = `/track-order/${data.id}`;
    }
  };

  return (
    <div className="overflow-x-hidden">
      <Card className="mb-4">
        <h2 className="text-lg font-bold text-white mb-3">Need Assistance?</h2>

        <div className="grid grid-cols-2 gap-2">
          {["Need Water", "Need Plate", "Need Bill", "Call Waiter"].map(
            (requestType) => (
              <Button
                key={requestType}
                onClick={() => sendAssistanceRequest(requestType)}
                variant="secondary"
                className="text-xs py-3"
              >
                {requestType}
              </Button>
            )
          )}
        </div>
      </Card>

      <Card className="mb-4 sticky top-2 z-30">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search food..."
          className="w-full bg-slate-800 text-white border border-slate-700 rounded-2xl px-4 py-3 outline-none mb-3 placeholder:text-slate-500"
        />

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 rounded-2xl text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Card>

      {cart.length > 0 && !showCart && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-4 left-3 right-3 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl z-50 shadow-2xl flex items-center justify-between px-5 font-bold"
        >
          <span>
            🛒 {totalItems} item{totalItems > 1 ? "s" : ""}
          </span>
          <span>View Cart • ₹{totalPrice}</span>
        </button>
      )}

      {showCart && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
          <div className="p-4 border-b border-slate-700 flex justify-between items-center shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-white">Review Order</h2>
              <p className="text-slate-400 text-sm">Table {tableNo}</p>
            </div>

            <button
              onClick={() => setShowCart(false)}
              className="text-white bg-slate-800 hover:bg-slate-700 w-10 h-10 rounded-full"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 text-center">
                <p className="text-slate-400">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-3 pb-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-900 border border-slate-700 rounded-3xl p-4"
                  >
                    <div className="flex justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-white">{item.name}</h3>
                        <p className="text-slate-400">₹{item.price}</p>
                      </div>

                      <p className="text-orange-400 font-bold">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-slate-800 text-white w-9 h-9 rounded-full hover:bg-red-500 transition"
                        >
                          -
                        </button>

                        <span className="text-white font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => addToCart(item)}
                          className="bg-slate-800 text-white w-9 h-9 rounded-full hover:bg-green-500 transition"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-slate-400 text-sm">Qty</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-700 bg-slate-950 shrink-0">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400">Total Amount</span>

                <span className="text-3xl font-bold text-white">
                  ₹{totalPrice}
                </span>
              </div>

              <button
                onClick={placeOrder}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-bold shadow-lg"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mb-3 flex justify-between items-center">
        <p className="text-slate-400 text-sm">
          {filteredItems.length} items found
        </p>

        {selectedCategory !== "All" && (
          <button
            onClick={() => setSelectedCategory("All")}
            className="text-orange-400 text-sm font-semibold"
          >
            Clear
          </button>
        )}
      </div>

      {filteredItems.length === 0 ? (
        <Card className="text-center">
          <p className="text-slate-400">
            No items found. Try another search or category.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-24">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden p-0">
              <img
                src={item.image}
                alt={item.name}
                className="h-44 w-full object-cover"
              />

              <div className="p-4">
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold text-white break-words">
                      {item.name}
                    </h2>

                    <p className="text-slate-400 text-sm mt-1">
                      {item.category}
                    </p>
                  </div>

                  <p className="text-xl font-bold text-white whitespace-nowrap">
                    ₹{item.price}
                  </p>
                </div>

                <Button onClick={() => addToCart(item)} className="w-full mt-4">
                  + Add
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
