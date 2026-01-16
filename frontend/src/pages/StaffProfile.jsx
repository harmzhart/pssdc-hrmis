import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchStaffById } from "../services/staffService";

function StaffProfile() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaffById(id)
      .then(setStaff)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading staff profile...</p>;
  if (!staff) return <p>Staff not found</p>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl">
      <Link
        to="/"
        className="text-primary text-sm mb-4 inline-block"
      >
        ← Back to Staff List
      </Link>

      <h2 className="text-xl font-semibold mb-4">
        {staff.lastName} {staff.firstName}
      </h2>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <ProfileItem label="Staff ID" value={staff.staffId} />
        <ProfileItem label="Department" value={staff.department} />
        <ProfileItem label="Designation" value={staff.designation} />
        <ProfileItem label="Unit" value={staff.unit || "—"} />
        <ProfileItem label="Grade Level" value={staff.gradeLevel || "—"} />
        <ProfileItem label="Step" value={staff.step || "—"} />
        <ProfileItem label="Email" value={staff.email || "—"} />
        <ProfileItem label="Phone" value={staff.phoneNumber || "—"} />
        <ProfileItem label="Status" value={staff.isActive ? "Active" : "Inactive"} />
      </div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

export default StaffProfile;
