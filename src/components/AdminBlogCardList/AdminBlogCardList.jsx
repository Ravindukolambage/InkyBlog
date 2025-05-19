import React, { Fragment, useState } from "react";
import AdminPostModal from "../AdminPostModal/AdminPostModal";
import { useNavigate } from "react-router-dom";

const AdminBlogCardList = ({ blogs }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();


  const handleUpdateSuccess = (blogId) => {
    navigate(`/adminUpdateBlog/${blogId}`);
    setShowModal(false);
  };

  return (
    <Fragment>
      <div className="w-full min-h-screen bg-slate-950 text-white pt-17 pb-4 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Latest Blogs</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-slate-800 rounded-xl shadow-md p-4 cursor-pointer"
              onClick={() => {
                setSelectedBlog(blog);
                setShowModal(true);
              }}
            >
              {blog.blogImage && (
                <img
                  src={`http://localhost:8081/uploads/${blog.blogImage}`}
                  alt={blog.blogTitle}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <span className="text-sm font-medium text-gray-300">
                {blog.blogCategory.toUpperCase()}
              </span>
              <h2 className="text-xl font-semibold text-white mt-2 mb-1">
                {blog.blogTitle}
              </h2>
              <p className="text-gray-400 text-sm mb-2">
                {new Date(blog.blogDate).toDateString()}
              </p>
              <p className="text-gray-300 text-sm line-clamp-3 text-justify leading-relaxed">
                {blog.blogContent}
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-all cursor-pointer">
                Read More...
              </button>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <AdminPostModal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          blog={selectedBlog}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </Fragment>
  );
};

export default AdminBlogCardList;
