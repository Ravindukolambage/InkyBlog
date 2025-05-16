import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import UserPostModal from "../UserPostModal/UserPostModal";
import { useNavigate } from "react-router-dom";

const UserBlogList = ({ userId }) => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserBlogs();
  }, [userId]);

  const fetchUserBlogs = () => {
    if (userId) {
      axios
        .get(`http://localhost:8081/api/userBlogs/${userId}`)
        .then((res) => setBlogs(res.data))
        .catch((err) => console.error(err));
    }
  };

  const handleDeleteSuccess = (deletedBlogId) => {
    setBlogs((prevBlogs) => prevBlogs.filter((b) => b.blogId !== deletedBlogId));
    setShowModal(false);
  };

  const handleUpdateSuccess = (blogId) => {
    navigate(`/updateBlog/${blogId}`);
    setShowModal(false);
  };

  return (
    <Fragment>
      <div className="w-full min-h-screen bg-slate-950 text-white pt-17 pb-4 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">My Blogs</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.blogId}
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

      <UserPostModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        blog={selectedBlog}
        onDeleteSuccess={handleDeleteSuccess}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </Fragment>
  );
};

export default UserBlogList;
