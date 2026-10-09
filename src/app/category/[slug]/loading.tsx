export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
      <div className="flex justify-end">
        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-44 bg-gray-200 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}