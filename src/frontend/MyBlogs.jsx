import React from 'react'
import Navbar from '../components/HeaderContent/Navbar'
import UserBlogList from '../components/UserBlogList/UserBlogList'

const MyBlogs = () => {
    const userId = localStorage.getItem("userId");

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white">
      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar />
      </div>
      <div>
        <UserBlogList userId={userId} />
      </div>
    </div>
  )
}

export default MyBlogs
