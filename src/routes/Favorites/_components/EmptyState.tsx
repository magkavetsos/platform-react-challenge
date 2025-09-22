import { Link } from "react-router-dom";
import { Cat } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md text-center px-4 py-12">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-50 mb-6">
          <Cat className="w-10 h-10 text-slate-600" />
        </div>

        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          No favorites yet
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          Save your favorite cat images and they will appear here.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm"
          >
            Browse random cats
          </Link>
          <Link
            to="/breeds"
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700"
          >
            Explore breeds
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
