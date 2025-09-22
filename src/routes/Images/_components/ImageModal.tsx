import { useState } from "react";
import { Copy, ExternalLink, X, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useFavorites,
  useAddFavorite,
  useDeleteFavorite,
} from "../../Favorites/hooks";
import { useImageById } from "../hooks";
import { useLockBodyScroll } from "../../../hooks/useLockBodyScroll";
import type { Favorite } from "../../../types";

export default function ImageModal({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const { data: image, isLoading, isError, error } = useImageById(id);
  const breed = image?.breeds?.[0];

  const stats = breed
    ? [
        { label: "Origin", value: breed.origin },
        { label: "Life span", value: `${breed.life_span} yrs` },
        { label: "Temperament", value: breed.temperament },
        { label: "Adaptability", value: `${breed.adaptability}/5` },
        { label: "Child friendly", value: `${breed.child_friendly}/5` },
        { label: "Dog friendly", value: `${breed.dog_friendly}/5` },
        { label: "Energy", value: `${breed.energy_level}/5` },
        { label: "Weight", value: `${breed.weight.metric} kg` },
      ]
    : [];

  useLockBodyScroll();

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const displayName = isLoading ? "" : breed?.name ?? "Mystery Cat";

  const { data: favorites } = useFavorites();
  const addFav = useAddFavorite();
  const deleteFav = useDeleteFavorite();

  const favEntry = favorites?.find((f: Favorite) => f.image_id === image?.id);
  const isFaved = !!favEntry;
  const isMutating = addFav.isPending || deleteFav.isPending;

  const handleToggleFav = () => {
    if (isMutating) return;

    if (isFaved) deleteFav.mutate(String(favEntry.id));
    else addFav.mutate(image.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl border border-slate-300 max-h-[90vh] flex flex-col overflow-hidden outline-4 outline-[#334155]">
        <div className="flex items-center justify-between p-3 border-b border-slate-300 bg-slate-100 rounded-t-2xl">
          <h2 className="text-lg font-bold text-slate-800">{displayName}</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-700 text-white rounded cursor-pointer text-sm"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="overflow-y-auto">
          {isLoading && <div className="p-6 text-slate-600">Loading...</div>}
          {isError && (
            <div className="p-6 text-red-600">
              {error?.message ?? "Error loading cat"}
            </div>
          )}
          {image && (
            <>
              <div className="bg-slate-50 relative">
                <img
                  src={image.url}
                  alt={breed?.name ?? "Cat Image"}
                  className="w-full h-64 object-cover"
                />

                <button
                  onClick={handleToggleFav}
                  aria-pressed={isFaved}
                  aria-label={
                    isFaved ? "Remove from favorites" : "Add to favorites"
                  }
                  disabled={isMutating}
                  className="absolute right-3 top-3 z-20 p-1 rounded-full bg-white/80 hover:bg-white text-slate-700 disabled:opacity-60 transition cursor-pointer"
                  type="button"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFaved ? "text-rose-500" : "text-slate-700"
                    }`}
                    {...(isFaved ? { fill: "currentColor" } : {})}
                  />
                </button>
              </div>

              <div className="flex justify-center p-4 border-b border-slate-200 bg-slate-50">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-800 font-medium transition cursor-pointer"
                >
                  <Copy className="w-5 h-5" />
                  {copied ? "Copied!" : "Share with friends!"}
                </button>
              </div>

              {breed && (
                <div className="p-4 space-y-3">
                  <Link
                    to={`/breeds?id=${encodeURIComponent(breed.id)}`}
                    className="inline-block text-sm text-slate-600 hover:text-slate-800 transition hover:underline"
                  >
                    View more images and details for this breed
                  </Link>
                  <p className="text-sm text-slate-700">{breed.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {stats.map((s) => (
                      <Stat key={s.label} label={s.label} value={s.value} />
                    ))}
                  </div>
                  {breed.wikipedia_url && (
                    <a
                      href={breed.wikipedia_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-slate-600 hover:text-slate-800 transition text-sm"
                    >
                      <span>Wikipedia</span> <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-100 rounded-lg p-2 shadow text-slate-800">
      <p className="font-semibold text-xs uppercase">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}
