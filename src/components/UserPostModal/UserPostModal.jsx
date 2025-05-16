import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const UserPostModal = ({ isVisible, onClose, blog, onUpdateSuccess, onDeleteSuccess }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isVisible || !blog) return null;

  const handleUpdate = () => {
    console.log("Update blog:", blog.blogId);
    if (onUpdateSuccess) onUpdateSuccess(blog.blogId); 
  };


  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:8081/api/userBlogsList/${blog.blogId}`);
      alert("Blog deleted successfully");
      if (onDeleteSuccess) onDeleteSuccess(blog.blogId); 
      onClose();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div
        ref={modalRef}
        className="w-full max-w-[500px] max-h-[90vh] overflow-y-auto bg-white rounded-lg p-4 shadow-xl relative"
      >
        <button
          className="text-black text-2xl font-bold absolute right-4 hover:text-red-600"
          onClick={onClose}
        >
          &times;
        </button>

        {blog.blogImage && (
          <img
            src={`http://localhost:8081/uploads/${blog.blogImage}`}
            alt={blog.blogTitle}
            className="w-full h-48 object-cover rounded mb-3"
          />
        )}

        <h2 className="text-lg font-bold text-gray-800 mb-1">{blog.blogTitle}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {new Date(blog.blogDate).toDateString()} | {blog.blogCategory}
        </p>
        <p className="text-gray-800 text-sm text-justify whitespace-pre-line leading-relaxed">
          {blog.blogContent}
        </p>

        <div className="mt-3 flex justify-end">
          <button
            onClick={() => handleUpdate(blog.blogId)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-all cursor-pointer"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="ml-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-all cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPostModal;
