import { Link, useLocation } from "react-router-dom";
import { Images, Cat, Heart } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Images", icon: Images },
    { path: "/breeds", label: "Breeds", icon: Cat },
    { path: "/favorites", label: "Favorites", icon: Heart },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
              <Cat className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">CatLover</span>
          </Link>

          <div className="flex gap-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    active
                      ? "text-white bg-slate-700"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <IconComponent
                    className={`w-4 h-4 ${
                      active ? "text-white" : "text-slate-500"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
