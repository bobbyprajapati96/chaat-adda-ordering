import { prisma } from "@/lib/prisma";
import DashboardClient from "@/components/DashboardClient";
import AssistanceClient from "@/components/AssistanceClient";
import DashboardAutoRefresh from "@/components/DashboardAutoRefresh";
import NewOrderPopup from "@/components/NewOrderPopup";
import PendingOrdersQueue from "@/components/PendingOrdersQueue";
import AdminProtected from "@/components/AdminProtected";
import DashboardStats from "@/components/DashboardStats";
import AdminNavbar from "@/components/AdminNavbar";
async function getData() {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          menuItem: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const assistanceRequests = await prisma.assistanceRequest.findMany({
    where: {
      status: "Pending",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    orders,
    assistanceRequests,
  };
}

export default async function DashboardPage() {
  const { orders, assistanceRequests } = await getData();

  return (
    <main className="min-h-screen p-6">
      <AdminNavbar />
      <AdminProtected />
      <PendingOrdersQueue orders={orders} />
      <DashboardAutoRefresh />
      <h1 className="text-4xl font-bold text-white mb-8">
        Chaat Adda Dashboard
      </h1>
      <DashboardStats orders={orders} assistanceRequests={assistanceRequests} />
      {/* Assistance Requests */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-4">
          Assistance Requests
        </h2>

        <AssistanceClient requests={assistanceRequests} />
      </div>

      {/* Orders */}
      <DashboardClient orders={orders} />
    </main>
  );
}
