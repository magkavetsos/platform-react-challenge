import { Cat } from "lucide-react";
import { Link } from "react-router-dom";

const FavoritesView = () => {
  return (
    <div className="min-h-screen-minus-header">
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-sky-100 to-indigo-50 mb-6">
          <Cat className="w-12 h-12 text-slate-600" />
        </div>

        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          No favorites yet
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          You haven't added any cats to your favourites. Browse random images or
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

        <p className="text-xs text-slate-400 mt-8">
          Tip: Click a cat image and use the favourite button to save it here.
        </p>
      </div>
    </div>
  );
};

export default FavoritesView;
