import { useState, useRef } from "react";

function StaffImport() {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    // Validate extension
    if (!selected.name.toLowerCase().endsWith(".xlsx")) {
      setError("Only Excel (.xlsx) files are allowed.");
      setFile(null);
      setFilename("");
      return;
    }

    setError("");
    setFile(selected);
    setFilename(selected.name);
  };

  const handleCancel = () => {
    setFile(null);
    setFilename("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/staff/import-excel", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        // Show backend error message
        setError(data?.message || "Upload failed");
        return;
      }

      // Show the result
      setResult(data);

      // Reset only the file input, but keep result visible
      handleCancel();
    } catch (err) {
      setError(err.message || "Failed to import staff data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium whitespace-nowrap">
        Import Staff:
      </label>

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Choose file */}
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="border px-3 py-1.5 rounded text-sm bg-white hover:bg-gray-100 whitespace-nowrap"
      >
        Choose File
      </button>

      {/* Filename */}
      <span className="text-xs text-gray-600 max-w-[160px] truncate">
        {filename || "No file chosen"}
      </span>

      {/* Upload + Cancel (only show when file exists) */}
      {file && (
        <>
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`
              px-4 py-1.5 rounded text-white text-sm whitespace-nowrap
              ${
                loading
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }
            `}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

          <button
            onClick={handleCancel}
            disabled={loading}
            className="px-3 py-1.5 rounded text-sm border bg-white hover:bg-gray-100 whitespace-nowrap"
          >
            Cancel
          </button>
        </>
      )}

      {/* Inline error */}
      {error && (
        <span className="text-xs text-red-600 ml-2">
          {error}
        </span>
      )}
    </div>
  );
}

export default StaffImport;
