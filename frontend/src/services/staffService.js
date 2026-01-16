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
