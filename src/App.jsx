import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./frontend/Login";
import Register from "./frontend/Register";
import Home from "./frontend/Home";
import CreateBlog from "./frontend/CreateBlog";
import MyBlogs from "./frontend/MyBlogs";
import UpdateBlogPost from "./frontend/updateBlog";
import ProfileEditCard from "./components/ProfileCard/ProfileEditCard";
import AdminDashboard from "./frontend/AdminDashboard";
import AdminUpdateBlog from "./frontend/AdminUpdateBlog";

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/CreateBlog" element={<CreateBlog />} />
          <Route path="/MyBlogs" element={<MyBlogs />} />
          <Route path="/updateBlog/:blogId" element={<UpdateBlogPost />} />
          <Route path="/ProfileEditCard" element={<ProfileEditCard />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/adminUpdateBlog/:blogId" element={<AdminUpdateBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
