import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
      }

      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* px-4 gives mobile left & right margins */}
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded shadow 
                      max-h-screen overflow-auto flex flex-col justify-center">
        
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/pssdc-logo.png"
            alt="PSSDC Logo"
            className="h-16 w-auto mb-2"
          />
          <h1 className="text-2xl font-bold text-center">PSSDC HRMIS</h1>
        </div>

        <h2 className="text-lg font-semibold mb-4 text-center">
          Admin Login
        </h2>

        {error && (
          <div className="mb-4 border border-red-200 bg-red-50 text-red-700 text-sm text-center px-4 py-2 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password with eye icon */}
          <div className="relative">
            <input
              className="border px-3 py-2 w-full rounded pr-12 
                         focus:outline-none focus:ring-2 focus:ring-primary"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
              // Eye Off Icon (correct, not cut off)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3l18 18"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.585 10.585A2 2 0 0012 14a2 2 0 001.414-.586"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6.633 6.633C4.28 8.099 2.458 10.943 2.458 12c1.274 4.057 5.065 7 9.542 7 1.38 0 2.704-.279 3.901-.784"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.367 17.367C19.72 15.901 21.542 13.057 21.542 12c-1.274-4.057-5.065-7-9.542-7-1.38 0-2.704.279-3.901.784"
                />
              </svg>
            ) : (
              // Eye Icon (normal)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
            </button>
          </div>

          <button className="bg-primary text-white px-4 py-2 rounded w-full hover:opacity-90 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
