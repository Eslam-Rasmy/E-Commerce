import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Helmet } from "react-helmet";
const Login = () => {
  const { setToken } = useContext(AuthContext);
  let [msg, setMsg] = useState(null);
  let [sucessMsg, setSucessMsg] = useState(null);
  let [looding, setLooding] = useState(false);
  const navigate = useNavigate();

  async function login(values) {
    try {
      setMsg(null);
      setSucessMsg(null);
      setLooding(true);
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      setSucessMsg(res.data.message);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      setMsg(err.response.data.message);
    } finally {
      setLooding(false);
    }
  }
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("email is required")
      .email("please enter valid email"),
    password: yup
      .string()
      .required("password is required")
      .matches(/^[A-z0-9_]{6,30}$/, "from 6 to 30 max"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <>
      <Helmet>
        <title>Sign in</title>
      </Helmet>

      <div className="container mx-auto mt-6 px-4">
        <form
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
          onSubmit={formik.handleSubmit}
        >
          <p className="py-2.5 mb-6 text-2xl sm:text-4xl font-medium text-center">
            Login now
          </p>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full py-2.5 px-4 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <div
              className="p-3 mb-4 text-sm bg-red-400 text-white rounded-lg"
              role="alert"
            >
              <span className="font-medium">Error:</span> {formik.errors.email}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full py-2.5 px-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.password && formik.touched.password && (
            <div
              className="p-3 mb-4 text-sm bg-red-400 text-white rounded-lg"
              role="alert"
            >
              <span className="font-medium">Error:</span>{" "}
              {formik.errors.password}
            </div>
          )}

          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className={` cursor-pointer w-full py-2.5 text-white font-medium rounded-lg text-sm ${
              !formik.isValid || formik.isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {looding ? "Loading..." : "Login now"}
          </button>

          <div className="text-center mt-4">
            <Link to="/forget" className="text-green-500 hover:underline">
              Forget Your Password?
            </Link>
          </div>

          {msg && <p className="text-red-500 mt-3.5 text-center">{msg}</p>}
          {sucessMsg && (
            <p className="text-green-500 mt-3.5 text-center">{sucessMsg}</p>
          )}
        </form>

        {looding && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
            <svg
              aria-hidden="true"
              className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
