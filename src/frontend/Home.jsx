import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/HeaderContent/Navbar";
import Banner from "../components/Banner/Banner";
import BlogCardList from "../components/BlogCardList/BlogCardList";
import SearchBar from "../components/SearchBar/SearchBar";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

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
        <div className="fixed top-0 left-0 w-full z-20">
          <Navbar />
        </div>
        <div className="pt-15">
          <Banner />
        </div>
        <div className="flex justify-center items-center mt-10 w-full min-w-[350px]">
          <div>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <div>
          <BlogCardList blogs={filteredBlogs} />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
