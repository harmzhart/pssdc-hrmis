import { useState } from "react";

function StaffEditForm({ staff = {}, onSave, onCancel, mode = "edit" }) {
  const [formData, setFormData] = useState({ ...staff });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNestedChange = (e, parent) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-sm">
      {/* ===== Personal Information ===== */}
      <Section title="Personal Information">
        <ProfileGrid>
          <Input label="First Name" name="firstName" value={formData.firstName || ""} onChange={handleChange} />
          <Input label="Middle Name" name="middleName" value={formData.middleName || ""} onChange={handleChange} />
          <Input label="Last Name" name="lastName" value={formData.lastName || ""} onChange={handleChange} />
          <Input label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth || ""} onChange={handleChange} />
          <Select label="Gender" name="gender" value={formData.gender || ""} onChange={handleChange} options={["Male", "Female"]} />
          <Select label="Marital Status" name="maritalStatus" value={formData.maritalStatus || ""} onChange={handleChange} options={["Single","Married","Divorced","Widowed"]} />
        </ProfileGrid>
      </Section>

      {/* ===== Contact Information ===== */}
      <Section title="Contact Information">
        <ProfileGrid>
          <Input label="Official Email" name="officialEmail" type="email" value={formData.officialEmail || ""} onChange={handleChange} />
          <Input label="Alternative Email" name="alternativeEmail" type="email" value={formData.alternativeEmail || ""} onChange={handleChange} />
          <Input label="Phone" name="phoneNumber" value={formData.phoneNumber || ""} onChange={handleChange} />
          <Input label="Address" name="residentialAddress" value={formData.residentialAddress || ""} onChange={handleChange} />
          <Input label="LGA" name="residentialLGA" value={formData.residentialLGA || ""} onChange={handleChange} />
        </ProfileGrid>
      </Section>

      {/* ===== Employment Information ===== */}
      <Section title="Employment Information">
        <ProfileGrid>
          <Input
            label="Staff ID"
            name="staffId"
            value={formData.staffId || ""}
            onChange={handleChange}
            disabled={mode === "edit"} // only disable in edit mode
          />
          <Input label="Department" name="department" value={formData.department || ""} onChange={handleChange} />
          <Input label="Designation" name="designation" value={formData.designation || ""} onChange={handleChange} />
          <Input label="Unit" name="unit" value={formData.unit || ""} onChange={handleChange} />
          <Input label="Grade Level" name="gradeLevel" value={formData.gradeLevel || ""} onChange={handleChange} />
          <Input label="Step" name="step" value={formData.step || ""} onChange={handleChange} />
          <Select
            label="Employment Type"
            name="employmentType"
            value={formData.employmentType || ""}
            onChange={handleChange}
            options={["Permanent","Temporary","Fixed-Term Contract","Expatriate","Others"]}
          />
          <Input label="Date of First Appointment" name="dateOfFirstAppointment" type="date" value={formData.dateOfFirstAppointment || ""} onChange={handleChange} />
          <Input label="Confirmation Date" name="confirmationDate" type="date" value={formData.confirmationDate || ""} onChange={handleChange} />
          <Input label="Last Promotion Date" name="lastPromotionDate" type="date" value={formData.lastPromotionDate || ""} onChange={handleChange} />
          <Input label="Next Promotion Eligibility Date" name="nextPromotionEligibilityDate" type="date" value={formData.nextPromotionEligibilityDate || ""} onChange={handleChange} />
          <Select label="Status" name="status" value={formData.status || ""} onChange={handleChange} options={["Active","On Leave","Retired","Suspended","Seconded","Deceased"]} />
        </ProfileGrid>
      </Section>

      {/* ===== Next of Kin ===== */}
      <Section title="Next of Kin">
        <ProfileGrid>
          <Input label="Name" name="name" value={formData.nextOfKin?.name || ""} onChange={(e) => handleNestedChange(e, "nextOfKin")} />
          <Input label="Relationship" name="relationship" value={formData.nextOfKin?.relationship || ""} onChange={(e) => handleNestedChange(e, "nextOfKin")} />
          <Input label="Phone" name="phoneNumber" value={formData.nextOfKin?.phoneNumber || ""} onChange={(e) => handleNestedChange(e, "nextOfKin")} />
          <Input label="Address" name="address" value={formData.nextOfKin?.address || ""} onChange={(e) => handleNestedChange(e, "nextOfKin")} />
        </ProfileGrid>
      </Section>

      {/* ===== Form Actions ===== */}
      <div className="flex gap-3 mt-4">
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
          {mode === "edit" ? "Save Changes" : "Create Staff"}
        </button>
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ---------------- Components ---------------- */
function Input({ label, name, value, onChange, type = "text", disabled }) {
  return (
    <div>
      <label className="text-gray-500">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded mt-1"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="text-gray-500">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded mt-1"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function ProfileGrid({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">{children}</div>;
}

function Section({ title, children }) {
  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

export default StaffEditForm;
