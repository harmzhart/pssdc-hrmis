import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchStaffById } from "../services/staffService";
import StaffEditForm from "../components/StaffEditForm";
import { updateStaff } from "../services/staffService";

function StaffProfile({ isAdmin = true }) {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchStaffById(id)
      .then(setStaff)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading staff profile...</p>;
  if (!staff) return <p>Staff not found</p>;

  const handleSave = async (updatedData) => {
    try {
      const updated = await updateStaff(id, updatedData);
      setStaff(updated);
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update staff");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-5xl mx-auto space-y-6 print-area">

      {/* ================= PRINT HEADER (ONLY FOR PRINT) ================= */}
      <div className="print-header hidden print:block mb-6 border-b pb-4">
        <div className="flex items-center justify-between">
          {/* Logo + Institution */}
          <div className="flex items-center space-x-3">
            <img
              src="/pssdc-logo.png"
              alt="PSSDC Logo"
              className="w-16 h-16 object-contain"
            />

            <div className="leading-[1.00]">
              <h2 className="text-sm font-bold max-w-[240px] m-0 p-0">
                Lagos State Public Service Staff Development Centre (PSSDC)
              </h2>
              <p className="text-xs m-0 p-0 mt-[1px]">
                Magodo, Lagos State, Nigeria
              </p>
            </div>
          </div>

          {/* Printed Date */}
          <div className="text-sm text-right">
            <p className="font-medium">Staff Profile</p>
            <p className="opacity-80">
              Printed on: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <Link to="/" className="text-primary text-sm inline-block mb-4 no-print">
        ← Back to Staff List
      </Link>

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 pb-4 print-keep">
        {/* Passport Photo */}
        <div className="flex-shrink-0 mb-4 sm:mb-0">
          <img
            src={staff.passportPhoto || "/default-avatar.png"}
            alt="Passport"
            className="w-32 h-40 object-cover rounded shadow border"
          />
        </div>

        {/* Name & Details */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-1">
            {staff.lastName} {staff.firstName} {staff.middleName || ""}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-1">
            Staff ID: <span className="font-medium">{staff.staffId}</span> |{" "}
            {staff.designation || "-"} | {staff.department}
          </p>

          <p className="text-sm sm:text-base">
            Status:{" "}
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusStyles(staff.status)}`}
            >
              {staff.status}
            </span>
          </p>
        </div>

        {/* ACTION BUTTONS */}
        {!isEditing && (
          <div className="mt-4 sm:mt-0 sm:ml-auto flex gap-2 no-print">
            {isAdmin && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary-dark transition"
              >
                Edit Staff Record
              </button>
            )}

            <button
              onClick={() => window.print()}
              className="bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition"
            >
              🖨️ Print Profile
            </button>
          </div>
        )}
      </div>

      {/* ================= EDIT MODE ================= */}
      {isEditing && (
        <StaffEditForm
          staff={staff}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {/* ================= PROFILE SECTIONS ================= */}
      {!isEditing && (
        <div className="space-y-8 text-sm">
          {/* Personal Information */}
          <Section title="Personal Information">
            <ProfileGrid>
              <ProfileItem label="Date of Birth" value={formatDate(staff.dateOfBirth)} />
              <ProfileItem label="Gender" value={staff.gender || "-"} />
              <ProfileItem label="Marital Status" value={staff.maritalStatus || "-"} />
              <ProfileItem label="Nationality" value={staff.nationality || "-"} />
              <ProfileItem label="State of Origin" value={staff.stateOfOrigin || "-"} />
              <ProfileItem label="Religion" value={staff.religion || "-"} />
              <ProfileItem label="Disability" value={staff.disability || "-"} />
            </ProfileGrid>
          </Section>

          {/* Contact Information */}
          <Section title="Contact Information">
            <ProfileGrid>
              <ProfileItem label="Official Email" value={staff.officialEmail} />
              <ProfileItem label="Alternative Email" value={staff.alternativeEmail || "-"} />
              <ProfileItem label="Phone" value={staff.phoneNumber || "-"} />
              <ProfileItem label="Residential Address" value={staff.residentialAddress || "-"} />
              <ProfileItem label="Residential LGA" value={staff.residentialLGA || "-"} />
              <ProfileItem label="Residential Ward" value={staff.residentialWard || "-"} />
              <ProfileItem label="Contact Address" value={staff.contactAddress || "-"} />
            </ProfileGrid>
          </Section>

          {/* Medical / Health Details */}
          <Section title="Medical / Health Details">
            <ProfileGrid>
              <ProfileItem label="Blood Group" value={staff.bloodGroup || "-"} />
              <ProfileItem label="Genotype" value={staff.genotype || "-"} />
              <ProfileItem label="Height (cm)" value={staff.heightCm || "-"} />
              <ProfileItem label="Weight (kg)" value={staff.weightKg || "-"} />
              <ProfileItem label="Disability" value={staff.disability || "-"} />

              {staff.hasMedicalCondition && (
                <ProfileItem
                  label="Medical Condition"
                  value={staff.medicalConditionDetail || "-"}
                />
              )}
            </ProfileGrid>
          </Section>

          {/* Employment Information */}
          <Section title="Employment Information">
            <ProfileGrid>
              <ProfileItem label="Department" value={staff.department || "-"} />
              <ProfileItem label="Unit" value={staff.unit || "-"} />
              <ProfileItem label="Job Title" value={staff.jobTitle || "-"} />
              <ProfileItem label="Designation" value={staff.designation || "-"} />
              <ProfileItem label="Cadre" value={staff.cadre || "-"} />
              <ProfileItem label="Grade" value={staff.gradeLevel || "-"} />
              <ProfileItem label="Step" value={staff.step || "-"} />
              <ProfileItem label="Previous Employment" value={staff.previousEmployment || "-"} />
              <ProfileItem label="Date of First Appointment" value={formatDate(staff.dateOfFirstAppointment)} />
              <ProfileItem label="Confirmation Date" value={formatDate(staff.confirmationDate)} />
              <ProfileItem label="Last Promotion" value={formatDate(staff.lastPromotionDate)} />
              <ProfileItem label="Next Promotion Eligibility" value={formatDate(staff.nextPromotionEligibilityDate)} />
              <ProfileItem label="Date of Retirement" value={formatDate(staff.dateOfRetirement)} />
              <ProfileItem label="Employment Type" value={staff.employmentType || "-"} />
              <ProfileItem label="Employment Mode" value={staff.employmentMode || "-"} />
            </ProfileGrid>
          </Section>

          {/* Education & Training */}
          <Section title="Education & Training">
            <ProfileGrid>
              <ProfileItem label="Academic Qualification" value={staff.education?.academicQualification || "-"} />
              <ProfileItem label="Additional Qualification(s)" value={staff.education?.additionalQualifications?.join(", ") || "-"} />
              <ProfileItem label="Professional Associations" value={staff.professionalAssociations?.join(", ") || "-"} />
              <ProfileItem label="Recent Trainings" value={staff.recentTrainings?.join(", ") || "-"} />
            </ProfileGrid>
          </Section>

          {/* Next of Kin */}
          <Section title="Next of Kin">
            <ProfileGrid>
              <ProfileItem label="Name" value={staff.nextOfKin?.name || "-"} />
              <ProfileItem label="Relationship" value={staff.nextOfKin?.relationship || "-"} />
              <ProfileItem label="Phone" value={staff.nextOfKin?.phoneNumber || "-"} />
              <ProfileItem label="Address" value={staff.nextOfKin?.address || "-"} />
            </ProfileGrid>
          </Section>

        </div>
      )}
    </div>
  );
}

/* ------------------- Helpers & Components ------------------- */

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function ProfileGrid({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">{children}</div>;
}

function Section({ title, children }) {
  return (
    <div className="border-t pt-4 print-section">
      <h3 className="text-lg font-semibold mb-3 print-keep">{title}</h3>
      {children}
    </div>
  );
}

function DocumentButton({ url, label }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary-dark transition"
    >
      {label}
    </a>
  );
}

function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
}

function statusStyles(status) {
  switch (status) {
    case "Active":
      return "bg-green-700 text-white";
    case "On Leave":
      return "bg-yellow-300 text-yellow-900";
    case "Retired":
      return "bg-red-700 text-white";
    case "Voluntarily Retired":
      return "bg-red-400 text-white";
    case "Withdrawn From Service":
      return "bg-red-400 text-white";
    case "Suspended":
      return "bg-orange-400 text-white";
    case "Seconded":
      return "bg-blue-700 text-white";
    case "Deceased":
      return "bg-gray-700 text-white";
    case "Deactivated":
      return "bg-purple-700 text-white";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default StaffProfile;
