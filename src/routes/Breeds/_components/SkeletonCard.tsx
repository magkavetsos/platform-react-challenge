const SkeletonCard = () => {
  return (
    <article className="h-56 bg-white rounded-xl shadow overflow-hidden p-4 animate-pulse">
      <div className="h-6 bg-slate-100 rounded w-3/4 mb-3" />
      <div className="h-3 bg-slate-100 rounded w-1/2 mb-4" />
      <div className="space-y-2">
        <div className="h-3 bg-slate-100 rounded w-full" />
        <div className="h-3 bg-slate-100 rounded w-5/6" />
        <div className="h-3 bg-slate-100 rounded w-2/3" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-8 bg-slate-100 rounded-full w-16" />
        <div className="h-8 bg-slate-100 rounded-full w-12" />
      </div>
    </article>
  );
};

export default SkeletonCard;
