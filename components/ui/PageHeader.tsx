export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white">{title}</h1>

      {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
    </div>
  );
}
