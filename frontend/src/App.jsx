import { Routes, Route, useNavigate } from "react-router-dom";
import StaffList from "./pages/StaffList";
import StaffProfile from "./pages/StaffProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import { useState, useEffect } from "react";

// Layout for protected pages (with header + logout)
function LayoutWithHeader({ isLoggedIn, handleLogout }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white px-6 py-3 flex items-center justify-between shadow">
        {/* Left: Logo + App Title */}
        <div className="flex items-center gap-2">
          <img
            src="/pssdc-logo.png"
            alt="PSSDC Logo"
            className="h-12 w-auto object-contain"
          />
          <div>
            <h1 className="text-xl font-semibold leading-tight">PSSDC HRMIS</h1>
            <p className="text-xs opacity-80 max-w-[200px] sm:max-w-none leading-snug">
              Lagos State Public Service Staff Development Centre
            </p>
          </div>
        </div>

        {/* Right: Logout Button */}
        <div>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<StaffList />} />
          <Route path="/staff/:id" element={<StaffProfile />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if logged in by trying to fetch staff
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/staff", {
          credentials: "include",
        });
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Routes>
      {/* Public page: Login (no header, no scroll issues) */}
      <Route
        path="/login"
        element={<Login setIsLoggedIn={setIsLoggedIn} />}
      />

      {/* Protected pages with header + logout */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <LayoutWithHeader
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
            />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
