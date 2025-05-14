import React from "react";
import image from "../assets/img1.jpg";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { signupValidation } from "../components/validation/validation";
import { ToastContainer, toast } from "react-toastify";

const initialValues = {
  name: "",
  email: "",
  password: "",
  conPassword: "",
};

const Register = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900">
      <title>Register Page</title>
      <Formik
        initialValues={initialValues}
        validationSchema={signupValidation}
        onSubmit={(values, actions) => {
          axios
            .post("http://localhost:8081/api/register", values)
            .then((res) => {
              toast.success("Registration successful");
              actions.resetForm();
            })
            .catch((err) => {
              console.error(err);
              toast.error("Username or Email already exists");
            });
        }}
      >
        {({ errors, touched }) => (
          <div className="flex shadow-2xl">
            <img
              src={image}
              alt=""
              className="brightness-70 w-[450px] object-cover xl:rounded-tl-2xl xl:rounded-bl-2xl xl:block hidden"
            />
            <Form>
              <div className="flex flex-col items-center justify-center text-center w-[450px] h-[650px] p-12 gap-2 bg-white rounded-2xl xl:rounded-tl-none xl:rounded-bl-none">
                <h1 className="text-4xl font-serif font-bold">
                  Welcome to InkyBlog
                </h1>
                <div className="flex flex-col text-xl text-left gap-1">
                  <span className="font-mono text-lg font-bold ">Username</span>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter Username"
                    className="rounded-md p-1 border-1 outline-none focus:border-cyan-400 focus:bg-slate-50 w-75 h-9 text-base"
                  />
                  {errors.name && touched.name && (
                    <small className="text-red-600 text-xs">
                      {errors.name}
                    </small>
                  )}
                </div>

                <div className="flex flex-col text-xl text-left gap-1">
                  <span className="font-mono text-lg font-bold pt-2">
                    Email
                  </span>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    className="rounded-md p-1 border-1 outline-none focus:border-cyan-400 focus:bg-slate-50 w-75 h-9 text-base"
                  />
                  {errors.email && touched.email && (
                    <small className="text-red-600 text-xs">
                      {errors.email}
                    </small>
                  )}
                </div>

                <div className="flex flex-col text-lg text-left gap-1">
                  <span className="font-mono text-lg font-bold pt-2">
                    Password
                  </span>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="rounded-md p-1 border-1 outline-none focus:border-cyan-400 focus:bg-slate-50 w-75 h-9 text-base"
                  />
                  {errors.password && touched.password && (
                    <small className="text-red-600 text-xs">
                      {errors.password}
                    </small>
                  )}
                </div>

                <div className="flex flex-col text-lg text-left gap-1">
                  <span className="font-mono text-lg font-bold pt-2">
                    Confirm Password
                  </span>
                  <Field
                    type="password"
                    name="conPassword"
                    placeholder="Enter Confirm Password"
                    className="rounded-md p-1 border-1 outline-none focus:border-cyan-400 focus:bg-slate-50 w-75 h-9 text-base"
                  />
                  {errors.conPassword && touched.conPassword && (
                    <small className="text-red-600 text-xs">
                      {errors.conPassword}
                    </small>
                  )}
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    className="px-10 py-2 text-2xl rounded-md bg-gradient-to-tr from-gray-800 to-gray-400 hover:from-black hover:to-white text-white"
                  >
                    Register
                  </button>
                </div>

                <p className="font-semibold text-gray-600 pt-2">
                  Already have an account?{" "}
                  <Link to="/Login" className="text-blue-400 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </Form>
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
        )}
      </Formik>
    </section>
  );
};

export default Register;
