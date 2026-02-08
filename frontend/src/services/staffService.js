const API_URL = "http://localhost:5000/api/staff";

// ==========================
// FETCH ALL STAFF
// ==========================
export const fetchStaff = async () => {
  const response = await fetch(API_URL, {
    credentials: "include", // ← send cookie for auth
  });
  if (!response.ok) throw new Error("Failed to fetch staff");
  return response.json();
};

// ==========================
// FETCH SINGLE STAFF
// ==========================
export const fetchStaffById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    credentials: "include", // ← send cookie for auth
  });
  if (!response.ok) throw new Error("Failed to fetch staff");
  return response.json();
};

// ==========================
// CREATE STAFF (FormData)
// ==========================
export const createStaff = async (formData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    credentials: "include", // ← send cookie for auth
    body: formData,         // FormData (do NOT set headers)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create staff");
  }

  return response.json();
};

// ==========================
// UPDATE STAFF (FormData)
// ==========================
export const updateStaff = async (id, formData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    credentials: "include", // ← send cookie for auth
    body: formData,         // FormData (do NOT set headers)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update staff");
  }

  return response.json();
};
