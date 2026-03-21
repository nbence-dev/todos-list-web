export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-4 w-64 bg-slate-100 rounded-lg animate-pulse" />
        </div>

        {/* Input Form Skeleton */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="h-12 bg-slate-50 rounded-xl border border-slate-100 animate-pulse" />
          <div className="h-10 w-28 bg-slate-200 rounded-lg animate-pulse ml-auto" />
        </div>

        {/* List Skeleton */}
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 bg-white border border-slate-100 rounded-xl animate-pulse shadow-sm"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
