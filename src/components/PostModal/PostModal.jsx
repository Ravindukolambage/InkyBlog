import React, { useEffect, useRef } from "react";

const PostModal = ({ isVisible, onClose, blog }) => {
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

        <h2 className="text-lg font-bold text-gray-800 mb-1">
          {blog.blogTitle}
        </h2>
        <p className="text-sm text-gray-500 mb-2">
          {new Date(blog.blogDate).toDateString()} | {blog.blogCategory}
        </p>

        <p className="text-gray-800 text-sm text-justify whitespace-pre-line leading-relaxed">
          {blog.blogContent}
        </p>
        
      </div>
    </div>
  );
};

export default PostModal;
