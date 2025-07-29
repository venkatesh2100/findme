"use client";

import React, { useEffect, useState } from "react";

export default function CSVUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const fetchFiles = async () => {
    const res = await fetch("http://localhost:4000/list-uploads");
    const json = await res.json();
    if (json.success) {
      setUploadedFiles(json.files);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    const res = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    setUploading(false);

    if (json.success) {
      alert("✅ File uploaded!");
      setFile(null);
      fetchFiles();
    } else {
      alert("❌ Upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        Upload CSV File
      </h2>

      {/* File Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select a CSV file
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full border border-gray-300 rounded-md p-2 text-sm file:bg-blue-500 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md hover:file:bg-blue-600 cursor-pointer"
        />
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full text-white font-medium py-2 rounded-md transition duration-150 ${
          uploading || !file
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      <hr className="my-6" />

      {/* Uploaded File List */}
      <h3 className="text-lg font-medium text-gray-800 mb-2">
        Uploaded CSV Files
      </h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((f, idx) => (
            <li
              key={idx}
              className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2"
            >
              {f}
            </li>
          ))
        ) : (
          <li className="text-gray-500 italic">No CSV files uploaded yet.</li>
        )}
      </ul>
    </div>
  );
}
