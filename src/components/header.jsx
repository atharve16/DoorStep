import { useState, useEffect } from "react";
import {
  User,
  Home,
  Map,
  Bell,
  Building,
  TreePine,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/authContext";

const Header = ({ isMenuOpen, setIsMenuOpen, setCurrentPage }) => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown && !e.target.closest(".dropdown-container")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown]);

  const navItems = [
    { name: "Dashboard", icon: BarChart3 },
    { name: "Listings", icon: Building },
    { name: "Map View", icon: Map },
    { name: "Builders", icon: Users },
    { name: "Communities", icon: TreePine },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center group">
            <div className="flex-shrink-0 flex items-center">
              <div className="relative">
                <Home className="h-10 w-10 text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mr-3" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-75 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 bg-clip-text text-transparent">
                  DoorStep
                </span>
                <div className="text-xs text-gray-500 -mt-1">
                  Find Your Perfect Home
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 p-2 rounded-lg hover:bg-blue-50 transition"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-blue-50/80 group"
              >
                <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4 dropdown-container relative">
            <button className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            {user ? (
              <div className="relative dropdown-container">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-3 bg-white/60 backdrop-blur-md rounded-2xl px-4 py-3 hover:bg-white/80 transition-all duration-300 border border-white/30 shadow-md hover:shadow-lg"
                >
                  <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="font-semibold text-gray-700 hidden sm:block">
                    {user.name}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 py-2 z-50">
                    <button
                      onClick={() => {
                        setCurrentPage("profile");
                        setShowDropdown(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-white/60 transition-all duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </button>
                    <hr className="my-2 border-gray-200/50" />
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50/60 transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage("auth")}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-bold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all duration-200 group"
              >
                <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
