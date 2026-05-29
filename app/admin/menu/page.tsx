import { prisma } from "@/lib/prisma";
import AddMenuItemForm from "@/components/AddMenuItemForm";
import DeleteMenuItemButton from "@/components/DeleteMenuItemButton";
import EditMenuItemButton from "@/components/EditMenuItemButton";
import AvailabilityToggleButton from "@/components/AvailabilityToggleButton";
import AdminProtected from "@/components/AdminProtected";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import AdminNavbar from "@/components/AdminNavbar";
async function getMenuItems() {
  return prisma.menuItem.findMany({
    orderBy: {
      id: "desc",
    },
  });
}

export default async function AdminMenuPage() {
  const items = await getMenuItems();

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <AdminProtected />
      <AdminNavbar />
      <PageHeader
        title="Admin Menu Panel"
        subtitle="Manage food items, prices, images and availability"
      />

      <AddMenuItemForm />

      <div className="grid gap-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-2xl shadow"
              />

              <div>
                <h2 className="text-xl font-bold text-white">{item.name}</h2>

                <p className="text-gray-600 font-semibold">₹{item.price}</p>

                <p className="text-slate-400 text-sm">{item.category}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <AvailabilityToggleButton
                id={item.id}
                available={item.available}
              />

              <EditMenuItemButton item={item} />

              <DeleteMenuItemButton id={item.id} />
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
