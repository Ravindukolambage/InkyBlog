import React from "react";
import image from "../assets/img1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { LoginValidation } from "../components/validation/validation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900">
      <title>Login Page</title>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginValidation}
        onSubmit={async (values, actions) => {
          try {
            const response = await axios.post(
              "http://localhost:8081/api/login",
              {
                email: values.email,
                password: values.password,
              }
            );

            const { userId, username, email } = response.data;

            // Save to localStorage
            localStorage.setItem("userId", userId);
            localStorage.setItem("name", username); // this is the correct one from backend
            localStorage.setItem("email", email);

            if (response.status === 200) {
              toast.success("Login Successful");
              setTimeout(() => {
                navigate("/home");
              }, 900);
            }
          } catch (error) {
            if (error.response?.status === 401) {
              toast.error("Invalid Email or Password");
            } else {
              alert("Server Error");
            }
          }
        }}
      >
        {({ errors, touched }) => (
          <div className="flex shadow-2xl">
            <Form>
              <div className="flex flex-col items-center justify-center text-center w-[450px] h-[650px] p-12 gap-4 bg-white rounded-2xl xl:rounded-tr-none xl:rounded-br-none ">
                <h1 className="text-4xl font-serif font-bold">
                  Welcome to InkyBlog
                </h1>
                <div className="h-3"></div>

                <div className="flex flex-col text-xl text-left gap-1">
                  <span className="font-mono text-lg font-bold">Email</span>
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

                <div className="flex flex-col text-xl text-left gap-1">
                  <span className="font-mono text-lg font-bold">Password</span>
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
                <div className="flex gap-1 items-center">
                  <input type="checkbox" />
                  <span className="text-base">Remember me</span>
                </div>

                <div>
                  <button
                    type="submit"
                    className="px-10 py-2 text-2xl rounded-md bg-gradient-to-tr from-gray-800 to-gray-400 hover:from-black hover:to-white text-white"
                  >
                    Login
                  </button>
                </div>
                <p className="font-semibold text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/Register"
                    className="text-blue-400 hover:underline"
                  >
                    Register
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
            <img
              src={image}
              alt=""
              className="brightness-70 w-[450px] object-cover xl:rounded-tr-2xl xl:rounded-br-2xl xl:block hidden"
            />
          </div>
        )}
      </Formik>
    </section>
  );
};

export default Login;
