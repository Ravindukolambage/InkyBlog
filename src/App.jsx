import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./frontend/Login";
import Register from "./frontend/Register";
import Home from "./frontend/Home";
import CreateBlog from "./frontend/CreateBlog";
import MyBlogs from "./frontend/MyBlogs";
import UpdateBlogPost from "./frontend/updateBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/CreateBlog" element={<CreateBlog />}></Route>
          <Route path="/MyBlogs" element={<MyBlogs />}></Route>
          <Route path="/updateBlog/:blogId" element={<UpdateBlogPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
