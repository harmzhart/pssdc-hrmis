export function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  let current = obj;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = current[key] || {};
      current = current[key];
    }
  });
}

export function transformValue(field, value) {
  if (value === "" || value === null) return undefined;

  if (field.toLowerCase().includes("date")) {
    const date = new Date(value);
    return isNaN(date) ? undefined : date;
  }

  if (field === "hasMedicalCondition") {
    return String(value).toLowerCase() === "yes";
  }

  if (
    field.includes("Qualifications") ||
    field.includes("Trainings") ||
    field.includes("Associations")
  ) {
    return String(value)
      .split(",")
      .map(v => v.trim())
      .filter(Boolean);
  }

  return value;
}
