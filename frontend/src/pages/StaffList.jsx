import { useEffect, useState } from "react";
import { fetchStaff, createStaff } from "../services/staffService";
import StaffTable from "../components/StaffTable";
import StaffEditForm from "../components/StaffEditForm";

function StaffList() {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false); // Modal toggle
  const [creating, setCreating] = useState(false); // For submit button state

  // Fetch staff data
  useEffect(() => {
    fetchStaff()
      .then(setStaff)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filter staff by search input
  const filteredStaff = staff.filter((person) =>
    `${person.firstName} ${person.lastName} ${person.staffId}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Handle staff creation
  const handleCreateStaff = async (newStaff) => {
    try {
      setCreating(true);
      const created = await createStaff(newStaff);
      setStaff((prev) => [created, ...prev]); // Add new staff at the top
      setShowCreate(false);
    } catch (error) {
      alert(error.message || "Failed to create staff");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        {/* Title */}
        <h2 className="text-lg font-semibold">Staff Directory</h2>

        {/* Search + Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name or staff ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-full sm:w-64"
          />

          {/* Create Staff button */}
          <button
            onClick={() => setShowCreate(true)}
            className="bg-primary text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            + Create Staff
          </button>
        </div>
      </div>

      {/* Staff Table */}
      {loading ? <p>Loading staff...</p> : <StaffTable staff={filteredStaff} />}

      {/* Create Staff Modal */}
      {showCreate && (
        <Modal onClose={() => setShowCreate(false)}>
          <h3 className="text-xl font-semibold mb-4">Create New Staff</h3>
          <StaffEditForm
            staff={{}}
            mode="create"
            onSave={handleCreateStaff}
            onCancel={() => setShowCreate(false)}
          />
          {creating && <p className="text-sm text-gray-500 mt-2">Creating staff...</p>}
        </Modal>
      )}
    </div>
  );
}

/* ------------------- Modal Component ------------------- */
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50 pt-10 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative max-h-[90vh] overflow-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>

        {/* Modal content */}
        {children}
      </div>
    </div>
  );
}

export default StaffList;
