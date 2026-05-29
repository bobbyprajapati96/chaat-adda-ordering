import Card from "@/components/ui/Card";

export default function AnalyticsCards({ orders }: { orders: any[] }) {
  const today = new Date().toDateString();

  const todaysOrders = orders.filter(
    (order) => new Date(order.createdAt).toDateString() === today
  );

  const completedOrders = todaysOrders.filter(
    (order) => order.status === "Completed"
  );

  const todaysRevenue = completedOrders.reduce((total, order) => {
    const orderTotal = order.items.reduce(
      (sum: number, item: any) => sum + item.quantity * item.menuItem.price,
      0
    );

    return total + orderTotal;
  }, 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const preparingOrders = orders.filter(
    (order) => order.status === "Preparing"
  ).length;

  const itemSales: Record<string, number> = {};

  completedOrders.forEach((order) => {
    order.items.forEach((item: any) => {
      const itemName = item.menuItem.name;

      itemSales[itemName] = (itemSales[itemName] || 0) + item.quantity;
    });
  });

  const topSellingItem = Object.entries(itemSales).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const totalItemsSold = Object.values(itemSales).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
      <Card>
        <p className="text-slate-400">Today's Orders</p>
        <h2 className="text-4xl font-bold text-white">{todaysOrders.length}</h2>
      </Card>

      <Card>
        <p className="text-slate-400">Today's Revenue</p>
        <h2 className="text-4xl font-bold text-orange-400">₹{todaysRevenue}</h2>
      </Card>

      <Card>
        <p className="text-slate-400">Pending Orders</p>
        <h2 className="text-4xl font-bold text-yellow-400">{pendingOrders}</h2>
      </Card>

      <Card>
        <p className="text-slate-400">Preparing Orders</p>
        <h2 className="text-4xl font-bold text-blue-400">{preparingOrders}</h2>
      </Card>

      <Card>
        <p className="text-slate-400">Top Selling Item</p>

        <h2 className="text-2xl font-bold text-white">
          {topSellingItem ? topSellingItem[0] : "No Sales Yet"}
        </h2>

        {topSellingItem && (
          <p className="text-orange-400 mt-2">{topSellingItem[1]} sold</p>
        )}
      </Card>

      <Card>
        <p className="text-slate-400">Items Sold Today</p>

        <h2 className="text-4xl font-bold text-green-400">{totalItemsSold}</h2>
      </Card>
    </div>
  );
}
