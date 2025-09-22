import { X } from "lucide-react";
import { useBreedImages } from "./hooks";
import { Link } from "react-router-dom";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

export default function BreedModal({
  breedId,
  onClose,
  title,
}: {
  breedId: string;
  onClose: () => void;
  title?: string;
}) {
  const { data: images, isLoading, isError, error } = useBreedImages(breedId);

  useLockBodyScroll();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-xl border border-slate-300 max-h-[90vh] overflow-hidden outline-4 outline-[#334155]">
        <div className="flex items-center justify-between p-3 border-b border-slate-300 bg-slate-100 rounded-t-2xl">
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-700 text-white rounded cursor-pointer text-sm"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="p-4 overflow-auto">
          {isLoading && <div className="text-slate-600">Loading images...</div>}
          {isError && (
            <div className="text-red-600">
              {error?.message ?? "Failed to load"}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images?.map((img: { id: string; url: string }) => (
              <Link
                key={img.id}
                to={`/?id=${encodeURIComponent(img.id)}`}
                className="block rounded overflow-hidden"
              >
                <img
                  src={img.url}
                  alt={img.id}
                  loading="lazy"
                  className="w-full h-32 object-cover"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
