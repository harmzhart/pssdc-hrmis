import { useNavigate } from "react-router-dom";
import { useState } from "react";

const statusStyles = {
  Active: "bg-green-700 text-white",
  "On Leave": "bg-yellow-300 text-yellow-900",
  Retired: "bg-red-700 text-white",
  Suspended: "bg-orange-400 text-white",
  Seconded: "bg-blue-700 text-white",
  Deceased: "bg-gray-700 text-white",
  Deactivated: "bg-purple-700 text-white",
};

const ITEMS_PER_PAGE = 10;

// Fixed column width for sticky column
const NAME_WIDTH = 180;

function StaffTable({ staff }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(staff.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStaff = staff.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-4">
      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-[2200px] border-collapse text-sm">
          <thead className="bg-primary text-white">
            <tr>
              {/* NON-STICKY STAFF ID */}
              <th className="p-3 text-left">Staff ID</th>

              {/* STICKY NAME COLUMN */}
              <th
                className="p-3 text-left sticky left-0 z-30 bg-primary"
                style={{ width: NAME_WIDTH }}
              >
                Name
              </th>

              {/* SCROLLABLE COLUMNS */}
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Unit</th>
              <th className="p-3 text-left">Job Title</th>
              <th className="p-3 text-left">Designation</th>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Step</th>
              <th className="p-3 text-left">Employment Type</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Official Email</th>
              <th className="p-3 text-left">First Appointment</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedStaff.map((person) => (
              <tr
                key={person._id}
                onClick={() => navigate(`/staff/${person._id}`)}
                className="border-b hover:bg-gray-100 cursor-pointer"
              >
                {/* NON-STICKY STAFF ID */}
                <td className="p-3">{person.staffId}</td>

                {/* STICKY NAME CELL */}
                <td
                  className="p-3 sticky left-0 z-20 bg-white font-medium"
                  style={{ width: NAME_WIDTH }}
                >
                  {person.lastName} {person.firstName}
                </td>

                {/* SCROLLABLE CELLS */}
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
                    ? new Date(person.dateOfFirstAppointment).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusStyles[person.status] || "bg-gray-100 text-gray-700"
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

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border text-sm ${
                  page === currentPage
                    ? "bg-primary text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default StaffTable;
