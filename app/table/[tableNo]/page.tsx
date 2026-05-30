import StartTableSession from "@/components/StartTableSession";

export default async function TableStartPage({
  params,
}: {
  params: Promise<{ tableNo: string }>;
}) {
  const resolvedParams = await params;
  const tableNo = Number(resolvedParams.tableNo);

  return (
    <main className="min-h-screen p-4 flex items-center justify-center">
      <StartTableSession tableNo={tableNo} />
    </main>
  );
}