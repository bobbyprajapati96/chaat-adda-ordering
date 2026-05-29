import { prisma } from "@/lib/prisma";
import MenuClient from "@/components/MenuClient";
import TableOrdersHistory from "@/components/TableOrdersHistory";
async function getMenuItems() {
  return prisma.menuItem.findMany({
    where: {
      available: true,
    },
    orderBy: {
      category: "asc",
    },
  });
}

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{
    table?: string;
  }>;
}) {
  const params = await searchParams;
  const menuItems = await getMenuItems();
  const tableNo = Number(params.table) || 1;

  return (
    <main className="min-h-screen p-3 pb-28 overflow-x-hidden">
      <div className="mb-5 rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-orange-400 font-semibold text-sm">Welcome to</p>

            <h1 className="text-3xl font-extrabold text-white leading-tight">
              Chaat Adda
            </h1>

            <p className="text-slate-400 text-sm mt-1">Scan • Order • Relax</p>
          </div>

          <div className="bg-orange-500 text-white px-4 py-2 rounded-2xl font-bold shadow-lg">
            Table {tableNo}
          </div>
        </div>
      </div>
      <TableOrdersHistory tableNo={tableNo} />
      <MenuClient menuItems={menuItems} tableNo={tableNo} />
    </main>
  );
}
