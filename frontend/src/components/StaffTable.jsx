import { useNavigate } from "react-router-dom";

function StaffTable({ staff }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full border-collapse">
        <thead className="bg-primary text-white">
          <tr>
            <th className="p-3 text-left">Staff ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Department</th>
            <th className="p-3 text-left">Designation</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((person) => (
            <tr
              key={person._id}
              onClick={() => navigate(`/staff/${person._id}`)}
              className="border-b hover:bg-gray-100 cursor-pointer"
            >
              <td className="p-3">{person.staffId}</td>
              <td className="p-3">
                {person.lastName} {person.firstName}
              </td>
              <td className="p-3">{person.department}</td>
              <td className="p-3">{person.designation}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    person.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {person.isActive ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StaffTable;

