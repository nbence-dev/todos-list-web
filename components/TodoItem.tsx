export function TodoItem({ content }: { content: string }) {
  return (
    <div className="group flex items-center gap-3 p-4 mb-3 border border-slate-100 rounded-xl bg-white transition-all hover:border-slate-300 hover:shadow-md">
      <div className="h-5 w-5 rounded border border-slate-300 bg-slate-50 flex shrink-0 cursor-pointer"></div>
      <span className="text-slate-700 font-medium text-sm">{content}</span>
    </div>
  );
}
