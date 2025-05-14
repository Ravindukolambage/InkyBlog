import React, { useState } from "react";
import Navbar from "../components/HeaderContent/Navbar";
import TextEditor from "../components/TextEditor/TextEditor";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field } from "formik";

const initialValues = {
  blogTitle: "",
  blogDate: "",
  blogCategory: "",
  blogContent: "",
  blogImage: null,
};

const CreateBlog = () => {
  const [fileName, setFileName] = useState("No file chosen");

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white">
      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      <div className="flex flex-col items-center justify-start pt-28 px-4 sm:px-6 lg:px-20 xl:px-40 pb-10">
        <div className="w-full max-w-4xl bg-slate-100 text-black p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
            Create Your Blog
          </h1>

          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              const formData = new FormData();
              Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
              });

              axios
                .post("http://localhost:8081/api/createBlog", formData, {
                  headers: { "Content-Type": "multipart/form-data" },
                })
                .then(() => {
                  toast.success("Creation Successful");
                  actions.resetForm();
                  setFileName("No file chosen");
                })
                .catch((err) => {
                  console.error(err);
                  toast.error("Creation Unsuccessful");
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
                  type="text"
                  name="blogCategory"
                  placeholder="Enter Blog Category"
                  className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
                />

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Image
                  </label>
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
                      }}
                    />
                    <span className="ml-4 text-sm text-gray-700">
                      {fileName}
                    </span>
                  </div>
                </div>

                <div className="w-full">
                  <TextEditor
                    value={values.blogContent}
                    onChange={(value) => setFieldValue("blogContent", value)}
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-400 hover:from-black hover:to-gray-300 text-white rounded-md text-base font-medium transition-transform transform hover:scale-105"
                  >
                    Submit Post
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <ToastContainer
            position="top-center"
            autoClose={3000}
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

export default CreateBlog;
