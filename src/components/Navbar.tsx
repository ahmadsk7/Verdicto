import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";

interface NavbarProps {
  onFeedbackClick: () => void;
}

const Navbar = ({ onFeedbackClick }: NavbarProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center" onClick={() => navigate("/")}>
            <h1 className="text-2xl font-bold text-blue-600">Verdicto</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onFeedbackClick}
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium"
            >
              Feedback
            </Button>
            
            {isAuthenticated ? (
              <>
                <span className="text-slate-600">
                  Welcome, {user?.firstName}
                </span>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-red-500 text-red-600 hover:bg-red-50 font-medium"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-medium"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium shadow-lg"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
