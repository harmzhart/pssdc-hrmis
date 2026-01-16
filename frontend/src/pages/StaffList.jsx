import { useEffect, useState } from "react";
import { fetchStaff } from "../services/staffService";
import StaffTable from "../components/StaffTable";

function StaffList() {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff()
      .then(setStaff)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredStaff = staff.filter((person) =>
    `${person.firstName} ${person.lastName} ${person.staffId}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Staff Directory
        </h2>

        <input
          type="text"
          placeholder="Search by name or staff ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
      </div>

      {loading ? (
        <p>Loading staff...</p>
      ) : (
        <StaffTable staff={filteredStaff} />
      )}
    </div>
  );
}

export default StaffList;
