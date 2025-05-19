import React, { useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ProfileCard = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const fileInputRef = useRef();
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage")
  );
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState(localStorage.getItem("name") || "Your Name");
  const [email, setEmail] = useState(
    localStorage.getItem("email") || "your@email.com"
  );
  const [isEditing, setIsEditing] = useState(false);
  const authorId = localStorage.getItem("authorId");

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);

    const formData = new FormData();
    formData.append("authorId", authorId);
    formData.append("authorPic", file);

    try {
      const res = await axios.put(
        "http://localhost:8081/api/profile/update",
        formData
      );
      const imageFilename = res.data.filename || file.name;

      localStorage.setItem("profileImage", imageFilename);
      setProfileImage(imageFilename);
      setPreviewImage(null);
      alert("Profile picture updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update image");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);

    setIsEditing(false);
    toast.success("Profile updated");
  };

  const imageSrc = previewImage
    ? previewImage
    : profileImage
    ? `http://localhost:8081/uploads/${profileImage}`
    : "https://via.placeholder.com/100";

  return (
    <div
      className="fixed inset-0 flex justify-center items-baseline mt-15 ml-170 z-50"
      id="profile"
      onClick={(e) => {
        if (e.target.id === "profile") onClose();
      }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-[400px] p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Profile Details</h2>
          <MdOutlineClose
            className="w-6 h-6 cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="flex justify-center relative mb-6">
          <img
            src={imageSrc}
            alt="Profile"
            className="w-28 h-28 rounded-full border border-gray-300 object-cover"
            onClick={handleImageClick}
          />
          <div
            onClick={handleImageClick}
            className="absolute bottom-2 right-24 bg-slate-500 p-2 rounded-full cursor-pointer hover:bg-slate-600"
          >
            <FaCamera className="text-white text-sm" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold text-gray-600">Name</p>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            ) : (
              <p>{name}</p>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-600">Email</p>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            ) : (
              <p>{email}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />
      </div>
    </div>
  );
};

export default ProfileCard;
