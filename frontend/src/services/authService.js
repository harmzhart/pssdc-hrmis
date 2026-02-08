export const loginAdmin = async (email, password) => {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // IMPORTANT for cookies
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
};

export const logoutAdmin = async () => {
  await fetch("http://localhost:5000/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};
