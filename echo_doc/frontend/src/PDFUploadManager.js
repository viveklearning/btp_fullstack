import React, { useState } from "react";

const PDFUploadManager = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); // ✅ new

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    const unique = selected.filter(
      (file) =>
        !files.some((f) => f.name === file.name && f.size === file.size)
    );
    setFiles((prev) => [...prev, ...unique]);
    setUploadStatus(""); // reset status when adding new files
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadStatus(""); // reset status when modifying files
  };

  const previewFile = (file) => {
    const blob = new Blob([file], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadStatus("⚠️ No PDFs selected.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      setUploading(true);       // ✅ start loader
      setUploadStatus("");      // reset message
      const res = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        setUploadStatus("✅ Upload Successful!");
        setFiles([]); // Clear the uploaded files
      } else {
        setUploadStatus("❌ Upload Failed: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("❌ Upload Failed. Server error.");
    } finally {
      setUploading(false); // ✅ stop loader
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {files.map((file, index) => (
          <li key={index} style={{ marginTop: "8px" }}>
            {file.name}
            <button onClick={() => previewFile(file)} style={{ marginLeft: "10px" }}>
              Preview
            </button>
            <button onClick={() => removeFile(index)} style={{ marginLeft: "10px", color: "red" }}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleUpload} disabled={uploading} style={{ marginTop: "10px" }}>
        {uploading ? "Uploading..." : "Upload PDFs"}
      </button>

      {uploadStatus && (
        <div style={{ marginTop: "10px", color: uploadStatus.includes("✅") ? "green" : "red" }}>
          {uploadStatus}
        </div>
      )}
    </div>
  );
};

export default PDFUploadManager;
