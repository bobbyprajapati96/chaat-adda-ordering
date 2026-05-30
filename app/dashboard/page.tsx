import { prisma } from "@/lib/prisma";
import AssistanceClient from "@/components/AssistanceClient";
import DashboardAutoRefresh from "@/components/DashboardAutoRefresh";
import AdminProtected from "@/components/AdminProtected";
import AdminNavbar from "@/components/AdminNavbar";
import DashboardToggleView from "@/components/DashboardToggleView";

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
      <AdminProtected />
      <DashboardAutoRefresh />
      <AdminNavbar />

      <h1 className="text-4xl font-bold text-white mb-8">
        Chaat Adda Dashboard
      </h1>

      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-4">
          Assistance Requests
        </h2>

        <AssistanceClient requests={assistanceRequests} />
      </div>

      <DashboardToggleView
        orders={orders}
        assistanceRequests={assistanceRequests}
      />
    </main>
  );
}
