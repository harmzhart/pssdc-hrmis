import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const statusStyles = {
  Active: "bg-green-700 text-white",
  "On Leave": "bg-yellow-300 text-yellow-900",
  Retired: "bg-red-700 text-white",
  "Voluntarily Retired": "bg-red-400 text-white",
  "Withdrawn From Service": "bg-red-400 text-white",
  Suspended: "bg-orange-400 text-white",
  Seconded: "bg-blue-700 text-white",
  Deceased: "bg-gray-700 text-white",
  Deactivated: "bg-purple-700 text-white",
};

const ITEMS_PER_PAGE = 10;
const NAME_WIDTH = 180;

function StaffTable({ staff, resetKey, onSortingChange }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  // Sort staff
  const sortedStaff = [...staff].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (valA == null) return 1;
    if (valB == null) return -1;

    // 🔹 Special handling for Grade Level (numeric sort)
    if (sortConfig.key === "gradeLevel") {
      const numA = parseInt(String(valA).replace(/\D/g, ""), 10);
      const numB = parseInt(String(valB).replace(/\D/g, ""), 10);

      if (isNaN(numA)) return 1;
      if (isNaN(numB)) return -1;

      return sortConfig.direction === "asc" ? numA - numB : numB - numA;
    }

    // 🔹 Special handling for Step (numeric sort)
    if (sortConfig.key === "step") {
      const numA = Number(valA);
      const numB = Number(valB);

      if (isNaN(numA)) return 1;
      if (isNaN(numB)) return -1;

      return sortConfig.direction === "asc" ? numA - numB : numB - numA;
    }

    // 🔹 Dates
    if (sortConfig.key === "dateOfFirstAppointment") {
      const dateA = new Date(valA);
      const dateB = new Date(valB);

      return sortConfig.direction === "asc"
        ? dateA - dateB
        : dateB - dateA;
    }

    // 🔹 Default string sort
    if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedStaff.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedStaff = sortedStaff.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const showingFrom = sortedStaff.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + ITEMS_PER_PAGE, sortedStaff.length);
  const totalItems = sortedStaff.length;
  const totalAll = staff.length;

  const getVisiblePages = () => {
    const delta = 2; // pages to show on each side
    const range = [];
    const rangeWithDots = [];

    let left = Math.max(1, currentPage - delta);
    let right = Math.min(totalPages, currentPage + delta);

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    // Always include first page
    if (left > 1) {
      rangeWithDots.push(1);
      if (left > 2) rangeWithDots.push("...");
    }

    rangeWithDots.push(...range);

    // Always include last page
    if (right < totalPages) {
      if (right < totalPages - 1) rangeWithDots.push("...");
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  // Sorting handler
  const handleSort = (key) => {
    setCurrentPage(1);

    setSortConfig((prev) => {
      const nextDirection =
        prev.key === key && prev.direction === "asc" ? "desc" : "asc";

      return {
        key,
        direction: nextDirection,
      };
    });

    onSortingChange(true);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return <span className="ml-1 text-gray-300 text-sm">⇅</span>;
    }

    return sortConfig.direction === "asc" ? (
      <span className="ml-1 text-white font-bold text-sm">▲</span>
    ) : (
      <span className="ml-1 text-white font-bold text-sm">▼</span>
    );
  };

  useEffect(() => {
    // Reset sorting and pagination when Clear All is pressed
    setSortConfig({
      key: null,
      direction: "asc",
    });
    setCurrentPage(1);
    // inform parent sorting is cleared
    onSortingChange(false);
  }, [resetKey]);

  return (
    <div className="space-y-4">
      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-[2200px] border-collapse text-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3 text-left">Staff ID</th>

              {/* Sortable Name */}
              <th
                className="p-3 text-left sticky left-0 z-30 bg-primary cursor-pointer select-none"
                style={{ width: NAME_WIDTH }}
                onClick={() => handleSort("lastName")}
              >
                Name <span className="ml-1 text-xs">{getSortIndicator("lastName")}</span>
              </th>

              <th className="p-3 text-left">Gender</th>

              {/* Sortable Department */}
              <th
                className="p-3 text-left cursor-pointer select-none"
                onClick={() => handleSort("department")}
              >
                Department{" "}<span className="ml-1 text-xs">{getSortIndicator("department")}</span>
              </th>

              <th className="p-3 text-left">Unit</th>
              <th className="p-3 text-left">Job Title</th>
              <th className="p-3 text-left">Designation</th>

              {/* Sortable Grade */}
              <th
                className="p-3 text-left cursor-pointer select-none"
                onClick={() => handleSort("gradeLevel")}
              >
                Grade{" "}<span className="ml-1 text-xs">{getSortIndicator("gradeLevel")}</span>
              </th>

              <th className="p-3 text-left">Step</th>
              <th className="p-3 text-left">Employment Type</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Official Email</th>

              {/* Sortable Date */}
              <th
                className="p-3 text-left cursor-pointer select-none"
                onClick={() => handleSort("dateOfFirstAppointment")}
              >
                First Appointment{" "}<span className="ml-1 text-xs">{getSortIndicator("dateOfFirstAppointment")}</span>
              </th>

              {/* Sortable Status */}
              <th
                className="p-3 text-left cursor-pointer select-none"
                onClick={() => handleSort("status")}
              >
                Status{" "}<span className="ml-1 text-xs">{getSortIndicator("status")}</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedStaff.map((person) => (
              <tr
                key={person._id}
                onClick={() => navigate(`/staff/${person._id}`)}
                className="border-b hover:bg-gray-100 cursor-pointer"
              >
                <td className="p-3">{person.staffId}</td>

                {/* Sticky Name */}
                <td
                  className="p-3 sticky left-0 z-20 bg-white font-medium hover:bg-gray-100"
                  style={{ width: NAME_WIDTH }}
                >
                  {person.lastName} {person.firstName}
                </td>

                <td className="p-3">{person.gender || "-"}</td>
                <td className="p-3">{person.department}</td>
                <td className="p-3">{person.unit || "-"}</td>
                <td className="p-3">{person.jobTitle || "-"}</td>
                <td className="p-3">{person.designation}</td>
                <td className="p-3">{person.gradeLevel}</td>
                <td className="p-3">{person.step || "-"}</td>
                <td className="p-3">{person.employmentType}</td>
                <td className="p-3">{person.phoneNumber || "-"}</td>
                <td className="p-3">{person.officialEmail}</td>

                <td className="p-3">
                  {person.dateOfFirstAppointment
                    ? new Date(
                        person.dateOfFirstAppointment
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusStyles[person.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {person.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CONTROL FOOTER */}
      <div className="bg-white border rounded shadow-sm px-4 py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-sm text-gray-600">

          {/* INFO */}
          <div className="font-normal text-center md:text-left leading-snug">
            Showing
            {" "}
            <span className="text-gray-900 font-medium">{showingFrom}</span>
            {" – "}
            <span className="text-gray-900 font-medium">{showingTo}</span>
            {" of "}
            <span className="text-gray-900 font-medium">{totalItems}</span>
            {" staff"}

            {totalAll > totalItems && (
              <span className="block md:inline md:ml-2 text-gray-400 font-normal">
                (filtered from {totalAll})
              </span>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-1">

              {/* FIRST */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-40"
              >
                {"<<"}
              </button>

              {/* PREVIOUS */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-40"
              >
                {"<"}
              </button>

              {/* PAGE NUMBERS */}
              {getVisiblePages().map((page, index) =>
                page === "..." ? (
                  <span key={index} className="px-2 text-gray-400 select-none">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded border transition ${
                      page === currentPage
                        ? "bg-primary text-white border-primary"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* NEXT */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-40"
              >
                {">"}
              </button>

              {/* LAST */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-40"
              >
                {">>"}
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default StaffTable;
