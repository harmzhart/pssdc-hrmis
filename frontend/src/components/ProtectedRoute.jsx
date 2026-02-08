import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // check auth status from backend (cookie-based)
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) setIsAuth(true);
        else setIsAuth(false);
      })
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Checking authentication...</p>;

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
