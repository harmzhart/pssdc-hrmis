import { Routes, Route } from "react-router-dom";
import StaffList from "./pages/StaffList";
import StaffProfile from "./pages/StaffProfile";

function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-primary text-white px-6 py-3 flex items-center justify-between shadow">
        {/* Left: App Title */}
        <div>
          <h1 className="text-xl font-semibold leading-tight">
            PSSDC HRMIS
          </h1>
          <p className="text-xs opacity-80 max-w-[200px] sm:max-w-none leading-snug">
            Lagos State Public Service Staff Development Centre
          </p>
        </div>

        {/* Right: Logo */}
        <div className="flex items-center">
          <img
            src="/pssdc-logo.png"
            alt="PSSDC Logo"
            className="h-12 w-auto object-contain"
          />
        </div>
      </header>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<StaffList />} />
          <Route path="/staff/:id" element={<StaffProfile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
