import React, { useState } from "react";
import toast from "react-hot-toast";
import { Axios } from "../App";

const BulkEmailUploader = () => {
  const [file, setFile] = useState(null);
  const [emailContent, setEmailContent] = useState("");

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEmailContentChange = (e) => {
    setEmailContent(e.target.value);
  };

  const handleSendEmails = async () => {
    if (!file) {
      toast.error("Please upload a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await Axios.post("/api/upload-excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Emails sent successfully");
    } catch (error) {
      console.error("Error sending emails:", error);
      toast.error("Error sending emails");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-50 h-screen w-screen flex flex-col">

    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="mb-4"
        />

        <button
          onClick={handleSendEmails}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send Emails
        </button>
      </div>
    </div>
    </div>
  );
};

export default BulkEmailUploader;
