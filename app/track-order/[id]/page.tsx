import { prisma } from "@/lib/prisma";
import OrderStatusNotifier from "@/components/OrderStatusNotifier";
import TrackAutoRefresh from "@/components/TrackAutoRefresh";
import Card from "@/components/ui/Card";
import CancelOrderButton from "@/components/CancelOrderButton";

async function getOrder(id: number) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          menuItem: true,
        },
      },
    },
  });
}

export default async function TrackOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const order = await getOrder(Number(resolvedParams.id));

  if (!order) {
    return (
      <main className="min-h-screen p-6 flex items-center justify-center">
        <Card>
          <h1 className="text-3xl font-bold text-white">Order not found</h1>
        </Card>
      </main>
    );
  }

  const steps = ["Pending", "Preparing", "Ready To Serve", "Completed"];

  const currentStep = steps.indexOf(order.status);

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <TrackAutoRefresh />

      <OrderStatusNotifier orderId={order.id} initialStatus={order.status} />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Track Your Order</h1>

          <p className="text-slate-400 mt-2">
            Chaat Adda • Table {order.tableNo}
          </p>
        </div>

        <Card className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-slate-400">Order ID</p>
              <h2 className="text-2xl font-bold text-white">#{order.id}</h2>
            </div>

            <div className="bg-orange-500 text-white px-4 py-2 rounded-2xl font-bold">
              {order.status}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 mb-8">
            {steps.map((step, index) => (
              <div key={step} className="flex-1 text-center">
                <div
                  className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold ${
                    index <= currentStep
                      ? "bg-orange-500 text-white"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {index + 1}
                </div>

                <p
                  className={`text-xs sm:text-sm mt-2 ${
                    index <= currentStep ? "text-white" : "text-slate-500"
                  }`}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-slate-800/70 rounded-2xl p-4 text-center">
            <p className="text-slate-400">
              {order.status === "Pending" && "Your order has been received."}

              {order.status === "Preparing" && "Your order is being prepared."}

              {order.status === "Ready To Serve" &&
                "Your order is ready and will be served soon."}

              {order.status === "Completed" &&
                "Your order has been completed. Thank you!"}

              {order.status === "Rejected" &&
                "Sorry, this order was rejected. Please contact counter."}

              {order.status === "Cancelled" && "Your order has been cancelled."}
            </p>
          </div>

          {order.status === "Pending" &&
            Date.now() - new Date(order.createdAt).getTime() < 30000 && (
              <CancelOrderButton orderId={order.id} />
            )}
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-white mb-4">Ordered Items</h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-slate-700 pb-3"
              >
                <div>
                  <p className="text-white font-semibold">
                    {item.menuItem.name}
                  </p>

                  <p className="text-slate-400 text-sm">
                    ₹{item.menuItem.price}
                  </p>
                </div>

                <p className="text-orange-400 font-bold">x{item.quantity}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
