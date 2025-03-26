import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logOut, isLoggingOut } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logOut(navigate);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Ask Question", path: "/ask" },
    { name: "My Questions", path: "/my" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="relative bg-black/20 backdrop-blur-lg border border-gray-800 shadow-xl z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white neon-glow tracking-widest font-orbitron"
        >
          WhoAsked?
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-white text-lg font-medium transition-all duration-300 font-orbitron group ${
                location.pathname === item.path
                  ? "text-purple-500 neon-underline"
                  : "hover:text-purple-400"
              }`}
            >
              {item.name}
              <span
                className={`absolute left-0 bottom-[-2px] h-[2px] w-0 bg-purple-500 transition-all duration-300 group-hover:w-full ${
                  location.pathname === item.path ? "w-full" : ""
                }`}
              />
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center text-white text-lg font-medium transition-all duration-300 hover:text-red-500"
          >
            Logout <LogOut size={20} className="ml-2" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/90 text-white p-4 space-y-4 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block text-lg text-center py-2 hover:text-purple-400 font-orbitron"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full text-lg text-center py-2 font-orbitron flex justify-center items-center ${
              isLoggingOut
                ? "text-gray-400 cursor-not-allowed"
                : "text-red-400 hover:text-red-500"
            }`}
          >
            {isLoggingOut ? (
              <span className="font-orbitron">Logging out...</span>
            ) : (
              <>
                <span className="font-orbitron">Logout</span>
                <LogOut size={20} className="ml-2" />
              </>
            )}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
