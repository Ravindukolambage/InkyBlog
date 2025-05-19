import React, { Fragment, useState, useEffect } from "react";
import Banner from "../components/Banner/Banner";
import SearchBar from "../components/SearchBar/SearchBar";
import axios from "axios";
import AdminBlogCardList from "../components/adminBlogCardList/adminBlogCardList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/blogs")
      .then((res) => {
        setBlogs(res.data);
        setFilteredBlogs(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredBlogs(blogs);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = blogs.filter(
        (blog) =>
          blog.blogTitle.toLowerCase().includes(lowerCaseQuery) ||
          blog.blogCategory.toLowerCase().includes(lowerCaseQuery) ||
          blog.blogContent.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredBlogs(filtered);
    }
  };

  return (
    <Fragment>
      <div className="w-full min-h-screen bg-slate-950">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white ml-12 mt-4">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="mt-5 px-4 py-2 mr-12 bg-gradient-to-r from-gray-800 to-gray-400 hover:from-black hover:to-gray-300 text-white rounded-md text-base font-medium transition-transform transform hover:scale-105 cursor-pointer"
          >
            Logout
          </button>
        </div>
        <div>
          <Banner />
        </div>
        <div className="flex justify-center items-center mt-10 w-full min-w-[350px]">
          <div>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <div>
          <AdminBlogCardList blogs={filteredBlogs} />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
