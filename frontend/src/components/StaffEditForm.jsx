import { useState } from "react";

function StaffEditForm({ staff = {}, onSave, onCancel, mode = "edit" }) {
  const [formData, setFormData] = useState({ ...staff });
  const [passportPhoto, setPassportPhoto] = useState(null);

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

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      // Handle arrays
      if (key === "professionalAssociations" || key === "recentTrainings") {
        // Convert comma-separated string to array if editing
        const arr = Array.isArray(value)
          ? value
          : value.split(",").map((v) => v.trim()).filter((v) => v);
        arr.forEach((v) => payload.append(key, v));
      }
      // Handle nested objects
      else if (typeof value === "object" && !(value instanceof File)) {
        payload.append(key, JSON.stringify(value));
      }
      // Skip passportPhoto here (will append separately)
      else if (key !== "passportPhoto") {
        payload.append(key, value);
      }
    });

    // Append passport image if selected
    if (passportPhoto) {
      payload.append("passportPhoto", passportPhoto);
    }

    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-sm">
      {/* ===== Personal Information ===== */}
      <Section title="Personal Information">
        <ProfileGrid>
          <Input label="First Name" name="firstName" value={formData.firstName || ""} onChange={handleChange} />
          <Input label="Middle Name" name="middleName" value={formData.middleName || ""} onChange={handleChange} />
          <Input label="Last Name" name="lastName" value={formData.lastName || ""} onChange={handleChange} />
          <Input
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formatDateForInput(formData.dateOfBirth) || ""}
            onChange={handleChange}
          />
          <Select label="Gender" name="gender" value={formData.gender || ""} onChange={handleChange} options={["Male", "Female"]} />
          <Select label="Marital Status" name="maritalStatus" value={formData.maritalStatus || ""} onChange={handleChange} options={["Single","Married","Divorced","Widowed"]} />
          <Input label="Nationality" name="nationality" value={formData.nationality || ""} onChange={handleChange} />
          <Input label="State of Origin" name="stateOfOrigin" value={formData.stateOfOrigin || ""} onChange={handleChange} />
          <Select label="Religion" name="religion" value={formData.religion || ""} onChange={handleChange} options={["Christianity","Islam","Traditional","Others"]} />
          <Select label="Disability" name="disability" value={formData.disability || ""} onChange={handleChange} options={["None","Hearing Impairment","Learning Impairment","Visual Impairment","Physical Impairment","Others"]} />
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
          <Input label="Ward" name="residentialWard" value={formData.residentialWard || ""} onChange={handleChange} />
        </ProfileGrid>
      </Section>

      {/* ===== Medical/Health Details ===== */}
      <Section title="Medical / Health Details">
        <ProfileGrid>
          <Select label="Blood Group" name="bloodGroup" value={formData.bloodGroup || ""} onChange={handleChange}
            options={["A+","A-","B+","B-","AB+","AB-","O+","O-"]} />

          <Select label="Genotype" name="genotype" value={formData.genotype || ""} onChange={handleChange}
            options={["AA","AS","AC","SS","SC"]} />

          <Input label="Height (cm)" name="heightCm" type="number" value={formData.heightCm || ""} onChange={handleChange} />
          <Input label="Weight (kg)" name="weightKg" type="number" value={formData.weightKg || ""} onChange={handleChange} />

          <Select label="Disability" name="disability" value={formData.disability || ""} onChange={handleChange}
            options={["None","Hearing Impairment","Learning Impairment","Visual Impairment","Physical Impairment","Others"]} />

          <Select
            label="Any Known Medical Condition?"
            name="hasMedicalCondition"
            value={formData.hasMedicalCondition === true ? "Yes" : formData.hasMedicalCondition === false ? "No" : ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                hasMedicalCondition: e.target.value === "Yes",
                medicalConditionDetail: e.target.value === "No" ? "" : formData.medicalConditionDetail,
              })
            }
            options={["No", "Yes"]}
          />

          {formData.hasMedicalCondition && (
            <Input label="Medical Condition Detail" name="medicalConditionDetail"
              value={formData.medicalConditionDetail || ""} onChange={handleChange} />
          )}
        </ProfileGrid>
      </Section>

      {/* ===== Passport Photograph ===== */}
      <Section title="Passport Photograph">
        <div>
          <label className="text-gray-500">Upload Passport Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPassportPhoto(e.target.files[0])}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>
      </Section>

      {/* ===== Employment Information ===== */}
      <Section title="Employment Information">
        <ProfileGrid>
          <Input
            label="Staff ID"
            name="staffId"
            value={formData.staffId || ""}
            onChange={handleChange}
            disabled={mode === "edit"}
          />
          <Select
            label="Department"
            name="department"
            value={formData.department || ""}
            onChange={handleChange}
            options={[
              "Director-General's Office",
              "Administrative and Human Resources",
              "Finance and Accounts",
              "Management Consultancy Services",
              "Planning and Research",
              "Learning and Development",
              "Technical Services and Quality Assurance",
              "Gender Development Studies and Special Duties",
              "Information and Communications Technology",
            ]}
          />
          <Input label="Unit" name="unit" value={formData.unit || ""} onChange={handleChange} />
          <Input label="Job Title" name="jobTitle" value={formData.jobTitle || ""} onChange={handleChange} />
          <Input label="Designation" name="designation" value={formData.designation || ""} onChange={handleChange} />
          <Input label="Cadre" name="cadre" value={formData.cadre || ""} onChange={handleChange} />
          <Input label="Grade Level" name="gradeLevel" value={formData.gradeLevel || ""} onChange={handleChange} />
          <Input label="Step" name="step" value={formData.step || ""} onChange={handleChange} />
          <Select
            label="Employment Type"
            name="employmentType"
            value={formData.employmentType || ""}
            onChange={handleChange}
            options={["Permanent","Temporary","Fixed-Term Contract","Expatriate","National Youth Service (NYSC)","Industrial Training (IT)","Internship","Others"]}
          />
          <Select
            label="Employment Mode"
            name="employmentMode"
            value={formData.employmentMode || ""}
            onChange={handleChange}
            options={["Employed By PSSDC", "Deployed To PSSDC"]}
          />
          <Input label="Previous Employment" name="previousEmployment" value={formData.previousEmployment || ""} onChange={handleChange} />
          <Input label="Date of First Appointment" name="dateOfFirstAppointment" type="date" value={formatDateForInput(formData.dateOfFirstAppointment) || ""} onChange={handleChange} />
          <Input label="Confirmation Date" name="confirmationDate" type="date" value={formatDateForInput(formData.confirmationDate) || ""} onChange={handleChange} />
          <Input label="Last Promotion Date" name="lastPromotionDate" type="date" value={formatDateForInput(formData.lastPromotionDate) || ""} onChange={handleChange} />
          <Input label="Next Promotion Eligibility Date" name="nextPromotionEligibilityDate" type="date" value={formatDateForInput(formData.nextPromotionEligibilityDate) || ""} onChange={handleChange} />
          <Input label="Date of Retirement" name="dateOfRetirement" type="date" value={formatDateForInput(formData.dateOfRetirement) || ""} onChange={handleChange} />
          <Select
            label="Status"
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
            options={["Active","On Leave","Retired","Voluntarily Retired","Withdrawn From Service","Suspended","Seconded","Deceased","Deactivated"]}
          />
        </ProfileGrid>
      </Section>

      {/* ===== Education & Training ===== */}
      <Section title="Education & Training">
        <ProfileGrid>
          <Input label="Academic Qualification" name="academicQualification" value={formData.education?.academicQualification || ""} onChange={(e) => handleNestedChange(e, "education")} />
          <Input
            label="Additional Qualification(s)"
            name="additionalQualifications"
            value={
              Array.isArray(formData.education?.additionalQualifications)
                ? formData.education.additionalQualifications.join(", ")
                : formData.education?.additionalQualifications || ""
            }
            onChange={(e) => {
              const values = e.target.value
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean);

              setFormData({
                ...formData,
                education: {
                  ...formData.education,
                  additionalQualifications: values,
                },
              });
            }}
          />
          <Input label="Professional Associations (Maximum of 3)" name="professionalAssociations" value={Array.isArray(formData.professionalAssociations) ? formData.professionalAssociations.join(", ") : formData.professionalAssociations || ""} onChange={handleChange} />
          <Input label="Three Recent Trainings" name="recentTrainings" value={Array.isArray(formData.recentTrainings) ? formData.recentTrainings.join(", ") : formData.recentTrainings || ""} onChange={handleChange} />
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

      {/* ===== Actions ===== */}
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

function formatDateForInput(isoDate) {
  return isoDate ? isoDate.split("T")[0] : "";
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
