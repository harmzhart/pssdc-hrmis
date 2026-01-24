import { useEffect, useState } from "react";
import { fetchStaff, createStaff } from "../services/staffService";
import StaffTable from "../components/StaffTable";
import StaffEditForm from "../components/StaffEditForm";
import * as XLSX from "xlsx";

function StaffList() {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    department: "",
    status: "",
    gender: "",
    employmentMode: "",
  });

  // Fetch staff data
  useEffect(() => {
    fetchStaff()
      .then(setStaff)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Search + Filter logic
  const filteredStaff = staff.filter((person) => {
    const matchesSearch = `${person.firstName} ${person.lastName} ${person.staffId}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDepartment =
      !filters.department || person.department === filters.department;

    const matchesStatus =
      !filters.status || person.status === filters.status;

    const matchesGender =
      !filters.gender || person.gender === filters.gender;

    const matchesEmploymentMode =
      !filters.employmentMode || person.employmentMode === filters.employmentMode;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesStatus &&
      matchesGender &&
      matchesEmploymentMode
    );
  });

  // Handle staff creation
  const handleCreateStaff = async (newStaff) => {
    try {
      setCreating(true);
      const created = await createStaff(newStaff);
      setStaff((prev) => [created, ...prev]);
      setShowCreate(false);
    } catch (error) {
      alert(error.message || "Failed to create staff");
    } finally {
      setCreating(false);
    }
  };

  const handleExport = () => {
    const exportData = filteredStaff.map((s) => ({
      "Staff ID": s.staffId,
      "Last Name": s.lastName,
      "First Name": s.firstName,
      Gender: s.gender || "",
      Department: s.department || "",
      Unit: s.unit || "",
      "Job Title": s.jobTitle || "",
      Designation: s.designation || "",
      Grade: s.gradeLevel || "",
      Step: s.step || "",
      "Employment Type": s.employmentType || "",
      Status: s.status || "",
      "First Appointment": s.dateOfFirstAppointment
        ? new Date(s.dateOfFirstAppointment).toLocaleDateString()
        : "",
      Phone: s.phoneNumber || "",
      Email: s.officialEmail || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Staff Directory");

    XLSX.writeFile(workbook, "PSSDC_Staff_Directory.xlsx");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4 space-y-3">
        {/* Title */}
        <h2 className="text-lg font-semibold">Staff Directory</h2>

        {/* Controls Container */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-4 md:gap-3 lg:flex lg:items-center lg:justify-between">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search by name or staff ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              border px-3 py-2 rounded 
              w-full 
              lg:w-64
            "
          />

          {/* DEPARTMENT */}
          <select
            value={filters.department}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                department: e.target.value,
              }))
            }
            className="
              border px-3 py-2 rounded 
              w-full
              lg:w-auto lg:min-w-[160px]
            "
          >
            <option value="">All Departments</option>
            {[...new Set(staff.map((s) => s.department))].map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* STATUS */}
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                status: e.target.value,
              }))
            }
            className="
              border px-3 py-2 rounded 
              w-full
              lg:w-auto lg:min-w-[140px]
            "
          >
            <option value="">All Status</option>
            {[...new Set(staff.map((s) => s.status))].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* GENDER */}
          <select
            value={filters.gender}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                gender: e.target.value,
              }))
            }
            className="
              border px-3 py-2 rounded 
              w-full
              lg:w-auto lg:min-w-[120px]
            "
          >
            <option value="">All Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* EMPLOYMENT MODE */}
          <select
            value={filters.employmentMode}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                employmentMode: e.target.value,
              }))
            }
            className="
              border px-3 py-2 rounded 
              w-full
              lg:w-auto lg:min-w-[180px]
            "
          >
            <option value="">All Employment Modes</option>
            <option value="Employed By PSSDC">Employed By PSSDC</option>
            <option value="Deployed To PSSDC">Deployed To PSSDC</option>
          </select>

          {/* RIGHT ACTIONS */}
          <div className="flex gap-2 lg:ml-auto w-full lg:w-auto">

            {/* EXPORT */}
            <button
              onClick={handleExport}
              className="
                border px-4 py-2 rounded 
                bg-white hover:bg-gray-100 
                whitespace-nowrap 
                w-full sm:w-full lg:w-auto
              "
            >
              Export
            </button>

            {/* CREATE */}
            <button
              onClick={() => setShowCreate(true)}
              className="
                bg-primary text-white px-5 py-2 rounded 
                whitespace-nowrap 
                w-full sm:w-full lg:w-auto
              "
            >
              + Create Staff
            </button>

          </div>
        </div>
      </div>

      {/* Staff Table */}
      {loading ? (
        <p>Loading staff...</p>
      ) : (
        <StaffTable staff={filteredStaff} />
      )}

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
          {creating && (
            <p className="text-sm text-gray-500 mt-2">
              Creating staff...
            </p>
          )}
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
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

export default StaffList;
