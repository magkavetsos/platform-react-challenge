import { Cat, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites, useDeleteFavorite } from "./hooks";

type Fav = {
  id: number;
  image_id: string;
  image?: { id: string; url: string };
};

function EmptyState() {
  return (
    <div className="text-center">
      <h2 className="text-lg font-medium text-slate-800 mt-6">
        No favorites yet
      </h2>
      <p className="text-sm text-slate-600 mb-6">
        You haven't added any cats to your favorites. Browse random images or
        explore breeds to find cats you love — then tap the heart to save them
        here.
      </p>

      <div className="flex items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-block px-4 py-2 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition"
        >
          Browse random cats
        </Link>

        <Link
          to="/breeds"
          className="inline-block px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition"
        >
          Explore breeds
        </Link>
      </div>
    </div>
  );
}

function FavoriteCard({
  fav,
  onRemove,
}: {
  fav: Fav;
  onRemove: (id: number) => void;
}) {
  const imageUrl = fav.image?.url;
  return (
    <div className="bg-white rounded-lg shadow relative overflow-hidden">
      <Link to={`/?id=${encodeURIComponent(fav.image_id)}`}>
        <img
          src={imageUrl}
          alt={`Favorite ${fav.image_id}`}
          className="w-full h-48 object-cover rounded hover:scale-130 duration-600 transition-transform"
        />
      </Link>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(fav.id);
        }}
        className="absolute top-3 right-3 p-2 bg-white/80 rounded-full text-slate-700 hover:bg-white cursor-pointer"
        aria-label="Remove favorite"
        type="button"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

function FavoritesList() {
  const { data: favorites, isLoading, isError } = useFavorites();
  const deleteFav = useDeleteFavorite();

  if (isLoading)
    return <div className="text-slate-600">Loading favorites...</div>;
  if (isError)
    return <div className="text-red-600">Failed to load favorites</div>;

  if (!favorites || favorites.length === 0) return <EmptyState />;

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
      {favorites.map((f: Fav) => (
        <FavoriteCard
          key={f.id}
          fav={f}
          onRemove={(id) => deleteFav.mutate(String(id))}
        />
      ))}
    </div>
  );
}

const FavoritesView = () => {
  return (
    <div className="min-h-screen-minus-header">
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-sky-100 to-indigo-50 mb-6">
          <Cat className="w-12 h-12 text-slate-600" />
        </div>

        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Your favorites
        </h1>

        <FavoritesList />
      </div>
    </div>
  );
};

export default FavoritesView;
