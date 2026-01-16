import { Routes, Route } from "react-router-dom";
import StaffList from "./pages/StaffList";
import StaffProfile from "./pages/StaffProfile";

function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-primary text-white p-4">
        <h1 className="text-xl font-semibold">
          PSSDC HRMIS
        </h1>
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
