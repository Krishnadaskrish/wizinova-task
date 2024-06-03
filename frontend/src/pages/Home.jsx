import React, { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Axios } from "../App";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const navigate = useNavigate();

  const handleCaption = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const handleFileChange = useCallback((event) => {
    setSelectedFile(event.target.files[0]);
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("userId");
      if (!id) {
        toast.error("User ID not found in local storage!");
        return;
      }

      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", selectedFile);

      const response = await Axios.post(`/api/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response, "------");

      if (response.status === 201) {
        toast.success("File Uploaded!");
        navigate("");

        setIsUploaded(true);
      } else {
        toast.error("Something went wrong!");
        console.log("Response:", response);
      }
    } catch (error) {
      console.error("Error uploading file:", error.response || error.message);
      if (error.response) {
        console.error("Server Response:", error.response.data);
        toast.error(
          `Error: ${error.response.data.message || "Failed to upload"}`
        );
      } else {
        toast.error("Error uploading file!");
      }
    }
  };

  useEffect(() => {
    if (isUploaded) {
      setSelectedFile(null);
      setDescription("");
      setIsUploaded(false);
    }
  }, [isUploaded]);

  return (
    <div className="bg-gray-900 text-gray-50 h-screen w-screen flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />

      <form className="text-center" onSubmit={handleUpload}>
        <h1>Upload images</h1>
        <br />
        <input
          className="border m-3"
          type="file"
          name="file"
          onChange={handleFileChange}
        />
        <br />
        <input
          className="text-white border-none bg-gray-900 m-3"
          type="text"
          onChange={handleCaption}
          value={description}
          placeholder="Type a caption"
        />
        <br />
        <button
          type="submit"
          className="rounded-lg w-16 bg-lime-600 text-white m-3"
          disabled={!selectedFile || !description}
        >
          Upload
        </button>
      </form>

      {selectedFile && (
        <div className="flex flex-col items-center">
          <h2>Preview:</h2>
          {selectedFile.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              style={{ maxWidth: "30%" }}
            />
          ) : selectedFile.type.startsWith("video/") ? (
            <video controls style={{ maxWidth: "30%" }}>
              <source
                src={URL.createObjectURL(selectedFile)}
                type={selectedFile.type}
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>File type not supported for preview.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Upload;
