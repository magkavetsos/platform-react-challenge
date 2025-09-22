import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import type { Favorite } from "../../../types";

const FavoriteCard = ({
  fav,
  onRemove,
}: {
  fav: Favorite;
  onRemove: (id: number) => void;
}) => {
  const imageUrl = fav.image?.url;

  return (
    <article
      className="relative bg-white rounded-lg shadow overflow-hidden"
      role="article"
    >
      <Link
        to={`/?id=${encodeURIComponent(fav.image_id)}`}
        className="block w-full h-48 bg-slate-100 overflow-hidden"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Favorite ${fav.image_id}`}
            className="w-full h-full object-cover hover:scale-130 duration-600 transition-transform"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-slate-500">
            No image
          </div>
        )}
      </Link>

      <button
        type="button"
        aria-label="Remove favorite"
        className="absolute top-2 right-2 inline-flex items-center justify-center w-9 h-9 rounded-md bg-white/80 hover:bg-white text-slate-700 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onRemove(fav.id);
        }}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </article>
  );
};

export default FavoriteCard;
