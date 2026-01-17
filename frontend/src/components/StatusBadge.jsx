const statusColors = {
  Active: "bg-green-700 text-white",
  "On Leave": "bg-yellow-300 text-yellow-900",
  Retired: "bg-red-700 text-white",
  Suspended: "bg-orange-400 text-white",
  Seconded: "bg-blue-700 text-white",
  Deceased: "bg-gray-700 text-white",
  Deactivated: "bg-purple-700 text-white",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        statusColors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
