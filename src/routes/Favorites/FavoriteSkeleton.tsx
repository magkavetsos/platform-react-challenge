const FavoriteSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden p-3 animate-pulse">
      <div className="h-40 bg-slate-100 rounded mb-3" />
      <div className="h-4 bg-slate-100 rounded w-3/4 mb-2" />
      <div className="h-3 bg-slate-100 rounded w-1/2" />
    </div>
  );
};

export default FavoriteSkeleton;
