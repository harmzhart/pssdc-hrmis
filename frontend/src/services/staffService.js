const API_URL = "http://localhost:5000/api/staff";

export const fetchStaff = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch staff");
  return response.json();
};

export const fetchStaffById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch staff");
  return response.json();
};

export const createStaff = async (data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create staff");
  }

  return response.json();
};

export const updateStaff = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update staff");
  }

  return response.json();
};
