function StaffEditForm({ staff, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...staff });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 text-sm"
    >
      <Input
        label="First Name"
        name="firstName"
        value={formData.firstName || ""}
        onChange={handleChange}
      />
      <Input
        label="Last Name"
        name="lastName"
        value={formData.lastName || ""}
        onChange={handleChange}
      />
      <Input
        label="Staff ID"
        name="staffId"
        value={formData.staffId || ""}
        onChange={handleChange}
        disabled
      />
      <Input
        label="Department"
        name="department"
        value={formData.department || ""}
        onChange={handleChange}
      />
      <Input
        label="Designation"
        name="designation"
        value={formData.designation || ""}
        onChange={handleChange}
      />
      <Input
        label="Unit"
        name="unit"
        value={formData.unit || ""}
        onChange={handleChange}
      />
      <Input
        label="Grade Level"
        name="gradeLevel"
        value={formData.gradeLevel || ""}
        onChange={handleChange}
      />
      <Input
        label="Step"
        name="step"
        value={formData.step || ""}
        onChange={handleChange}
      />
      <Input
        label="Email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
      />
      <Input
        label="Phone"
        name="phoneNumber"
        value={formData.phoneNumber || ""}
        onChange={handleChange}
      />

      <div className="col-span-2 flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Input({ label, name, value, onChange, disabled }) {
  return (
    <div>
      <label className="text-gray-500">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded mt-1"
      />
    </div>
  );
}

import { useState } from "react";
export default StaffEditForm;
