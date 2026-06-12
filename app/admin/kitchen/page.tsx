import { prisma } from "@/lib/prisma";
import AdminProtected from "@/components/AdminProtected";
import AdminNavbar from "@/components/AdminNavbar";
import KitchenClient from "@/components/KitchenClient";
import DashboardAutoRefresh from "@/components/DashboardAutoRefresh";
async function getOrders() {
  return prisma.order.findMany({
    where: {
      status: {
        in: ["Pending", "Preparing", "Ready To Serve"],
      },
    },
    include: {
      items: {
        include: {
          menuItem: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export default async function KitchenPage() {
  const orders = await getOrders();

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <AdminProtected />
      <DashboardAutoRefresh />
      <AdminNavbar />
      <h1 className="text-4xl font-bold text-white mb-8">Kitchen Display</h1>

      <KitchenClient orders={orders} />
    </main>
  );
}
