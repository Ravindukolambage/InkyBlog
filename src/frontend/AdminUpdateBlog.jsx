import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TextEditor from "../components/TextEditor/TextEditor";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

const AdminUpdateBlogPost = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [registerId, setRegisterId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const navigate = useNavigate();

  useEffect(() => {
  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!userId) {
    toast.error("Please log in first");
    return;
  }

  setRegisterId(userId);

  const url = isAdmin
    ? "http://localhost:8081/api/userBlogs/all?isAdmin=true"
    : `http://localhost:8081/api/userBlogs/${userId}`;

  axios
    .get(url)
    .then((res) => {
      const blog = isAdmin
        ? res.data.find((b) => b.blogId === parseInt(blogId))
        : res.data.find((b) => b.blogId === parseInt(blogId));

      if (blog) {
        setBlogData(blog);
        setImagePreview(`http://localhost:8081/uploads/${blog.blogImage}`);
      } else {
        toast.error("Blog not found");
      }
    })
    .catch((err) => {
      console.error(err);
      toast.error("Failed to load blog");
    });
}, [blogId]);

  if (!blogData) {
    return <div className="text-black text-center mt-10">Loading blog...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white">
      <div className="flex flex-col items-center justify-start pt-28 px-4 sm:px-6 lg:px-20 xl:px-40 pb-10">
        <div className="w-full max-w-4xl bg-slate-100 text-black p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
            Update Blog Post
          </h1>

          <Formik
            initialValues={{
              blogTitle: blogData.blogTitle,
              blogDate: blogData.blogDate.split("T")[0],
              blogCategory: blogData.blogCategory,
              blogContent: blogData.blogContent,
              blogImage: null,
            }}
            onSubmit={(values, actions) => {
              const stripHtml = (html) => {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = html;
                return tempDiv.textContent || tempDiv.innerText || "";
              };

              const formData = new FormData();
              formData.append("blogTitle", values.blogTitle);
              formData.append("blogDate", values.blogDate);
              formData.append("blogCategory", values.blogCategory);
              formData.append("blogContent", stripHtml(values.blogContent));

              if (values.blogImage) {
                formData.append("image", values.blogImage);
              }

              axios
                .put(
                  `http://localhost:8081/api/userBlogsList/${blogId}`,
                  formData,
                  {
                    headers: { "Content-Type": "multipart/form-data" },
                  }
                )
                .then(() => {
                  toast.success("Blog updated successfully");
                  setTimeout(() => {
                    navigate("/admin/dashboard");
                  }, 900);
                })
                .catch((err) => {
                  console.error(err);
                  toast.error("Update failed");
                });
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                <Field
                  type="text"
                  name="blogTitle"
                  placeholder="Enter Blog Title"
                  className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <Field
                  type="date"
                  name="blogDate"
                  className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <Field
                  as="select"
                  name="blogCategory"
                  className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <option value="" disabled>
                    Select Blog Category
                  </option>
                  <option value="Sport">Sport</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Education">Education</option>
                  <option value="Technology">Technology</option>
                </Field>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload New Image
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer inline-flex items-center px-4 py-2 bg-slate-500 text-white text-sm font-medium rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Choose File
                      </label>
                      <input
                        id="file-upload"
                        name="blogImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          setFieldValue("blogImage", file);
                          setFileName(file ? file.name : "No file chosen");
                          setImagePreview(
                            file ? URL.createObjectURL(file) : null
                          );
                        }}
                      />
                      <span className="ml-4 text-sm text-gray-700">
                        {fileName}
                      </span>
                    </div>

                    {imagePreview && (
                      <div className="w-24 h-24 border border-gray-300 rounded-md overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <TextEditor
                  value={values.blogContent}
                  onChange={(value) => setFieldValue("blogContent", value)}
                />

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-400 hover:from-black hover:to-gray-300 text-white rounded-md text-base font-medium transition-transform transform hover:scale-105"
                  >
                    Update Post
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateBlogPost;
