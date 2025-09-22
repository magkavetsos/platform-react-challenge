import { useFavorites, useDeleteFavorite } from "./hooks";
import type { Favorite } from "../../types";
import EmptyState from "./_components/EmptyState";
import FavoriteSkeleton from "./_components/FavoriteSkeleton";
import FavoriteCard from "./_components/FavoriteCard";

export default function FavoritesView() {
  const { data: favorites, isLoading, isError } = useFavorites();
  const deleteFav = useDeleteFavorite();

  const handleRemove = (id: number) => {
    deleteFav.mutate(String(id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen-minus-header">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-xl font-semibold text-slate-800 mb-6">
            Favorites
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <FavoriteSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen-minus-header">
        <div className="max-w-7xl mx-auto px-4 py-8 text-red-600">
          Failed to load favorites
        </div>
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="min-h-screen-minus-header">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-xl font-semibold text-slate-800 mb-6">
            Favorites
          </h1>
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen-minus-header">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold text-slate-800 mb-6">Favorites</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((f: Favorite) => (
            <FavoriteCard key={f.id} fav={f} onRemove={handleRemove} />
          ))}
        </div>
      </div>
    </div>
  );
}
