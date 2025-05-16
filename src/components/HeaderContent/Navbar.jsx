import React, { useState, useEffect, useRef, Fragment } from "react";
import Logo from "../../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard";

const handleLogout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const [username, setUsername] = useState(null);

  useEffect(() => {

    const loadProfile = () => {
      const storedUsername = localStorage.getItem("name");

      if (storedUsername) {
        setUsername(storedUsername);
      }
    };

    loadProfile();

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <Fragment>
      <div>
        <header className="flex justify-between items-center text-black py-6 px-8 md:px-32 bg-slate-300 drop-shadow-md h-14">
          <div className="flex items-center gap-4">
            <a href="/Home">
              <img
                src={Logo}
                alt="Logo"
                className="w-[165px] hover:scale-105 transition-all"
              />
            </a>
          </div>

          <ul className="hidden xl:flex items-center ml-90 gap-12 font-semibold text-base">
            <li
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                location.pathname === "/Home"
                  ? "bg-slate-900 text-white"
                  : "hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Link to="/Home">Home</Link>
            </li>
            <li
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                location.pathname === "/CreateBlog"
                  ? "bg-slate-900 text-white"
                  : "hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Link to="/CreateBlog">Create Blog</Link>
            </li>
            <li
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                location.pathname === "/MyBlogs"
                  ? "bg-slate-900 text-white"
                  : "hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Link to="/MyBlogs">My Blogs</Link>
            </li>
          </ul>

          <div className="relative hidden md:flex items-center ml-70 gap-3 font-semibold text-base">
            <i>
              <CgProfile
                className="h-7 w-7 cursor-pointer"
                onClick={() => setShowProfile(true)}
              />
            </i>
            <button
              onClick={handleLogout}
              className="p-1.5 hover:bg-slate-900 hover:text-white rounded-md transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>

          <i>
            <IoMenu
              className="h-8 w-8 xl:hidden block text-5xl cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </i>

          <div
            ref={menuRef}
            className={`absolute xl:hidden mt-71 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Link
              to="/Home"
              className="list-none w-full text-center p-4 hover:bg-slate-500 hover:text-white transition-all cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="/CreateBlog"
              className="list-none w-full text-center p-4 hover:bg-slate-500 hover:text-white transition-all cursor-pointer"
            >
              Create Blog
            </Link>
            <Link
              to="/MyBlogs"
              className="list-none w-full text-center p-4 hover:bg-slate-500 hover:text-white transition-all cursor-pointer"
            >
              My Blogs
            </Link>
          </div>
        </header>
      </div>
      <ProfileCard isVisible={showProfile} onClose ={() => setShowProfile(false)}/>
    </Fragment>
  );
};

export default Navbar;
