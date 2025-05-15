import { useLocation, useNavigate } from "react-router-dom";
import { BarChart, Briefcase, LogOut, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/api";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const token = localStorage.getItem("kite_session_token");
    if (token) {
      await authService.logoutSession(token);
    }
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-primary-800 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <BarChart className="h-8 w-8 text-accent-500" />
                <span className="font-bold text-xl">Kite Portfolio</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <a
                  href="/portfolio"
                  className={`flex items-center text-white transition-colors px-3 py-2 text-sm font-medium ${
                    isActive("/portfolio")
                      ? "text-accent-400"
                      : "hover:text-accent-400"
                  }`}
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className={`flex items-center text-white transition-colors px-3 py-2 text-sm font-medium ${
                    isActive("/profile")
                      ? "text-accent-400"
                      : "hover:text-accent-400"
                  }`}
                >
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </a>
              </li>
            </ul>
          </nav>

          {/* Logout Button */}
          <div>
            <button
              onClick={handleLogout}
              className="flex items-center text-white hover:text-accent-400 transition-colors px-3 py-2 text-sm font-medium"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
