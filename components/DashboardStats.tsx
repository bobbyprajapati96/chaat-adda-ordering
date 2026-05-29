import Card from "@/components/ui/Card";

export default function DashboardStats({
  orders,
  assistanceRequests,
}: {
  orders: any[];
  assistanceRequests: any[];
}) {
  const pending = orders.filter((order) => order.status === "Pending").length;

  const preparing = orders.filter(
    (order) => order.status === "Preparing"
  ).length;

  const completed = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <Card>
        <p className="text-slate-400">Pending Orders</p>
        <h2 className="text-4xl font-bold text-white">{pending}</h2>
      </Card>

      <Card>
        <p className="text-slate-400">Preparing</p>
        <h2 className="text-4xl font-bold text-blue-400">{preparing}</h2>
      </Card>

      <Card>
        <p className="text-slate-400">Completed</p>
        <h2 className="text-4xl font-bold text-green-400">{completed}</h2>
      </Card>

      <Card>
        <p className="text-slate-400">Assistance</p>
        <h2 className="text-4xl font-bold text-orange-400">
          {assistanceRequests.length}
        </h2>
      </Card>
    </div>
  );
}
