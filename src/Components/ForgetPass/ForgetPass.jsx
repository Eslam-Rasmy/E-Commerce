import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const ForgetPass = () => {
  const navigate = useNavigate();
  let [msg, setMsg] = useState(null);
  let [sucessMsg, setSucessMsg] = useState(null);
  let [looding, setLooding] = useState(false);
  async function forgetPassword(values) {
    try {
      setMsg(null);
      setSucessMsg(null);
      setLooding(true);
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",

        values
      );
      setMsg(null);
      setSucessMsg(res.data.message);
      setLooding(false);
      setTimeout(() => {
        navigate("/code");
      }, 1000);
    } catch (err) {
      console.log(err);
      setSucessMsg(null);
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
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: forgetPassword,
    validationSchema,
    validateOnMount: true,
  });
  return (
    <>
      <Helmet>
        <title>ForgetPass</title>
      </Helmet>
      {looding ? (
        <div
          role="status"
          className=" fixed top-0 start-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
      ) : (
        false
      )}
    <div className="container mx-auto mt-10 px-4">
  <p className="text-4xl font-semibold text-center text-gray-800 mb-8">
    Please Enter Your Email
  </p>

  <form className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6" onSubmit={formik.handleSubmit}>
    <div className="relative z-0 w-full mb-6 group">
      <input
        type="email"
        name="email"
        id="email"
        className="block py-3 px-4 w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
        placeholder="Enter your email"
        required
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </div>

    {formik.errors.email && formik.touched.email && (
      <div className="p-3 mb-4 text-sm text-white bg-red-500 rounded-lg" role="alert">
        ⚠️ {formik.errors.email}
      </div>
    )}

    <button
      type="submit"
      disabled={!formik.isValid || formik.isSubmitting}
      className={` cursor-pointer w-full py-3 text-white font-medium rounded-lg text-lg transition duration-200 ${
        !formik.isValid || formik.isSubmitting
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {looding ? "Loading..." : "Verify"}
    </button>

    {msg && <p className="text-red-600 text-center mt-4">{msg}</p>}
    {sucessMsg && <p className="text-green-600 text-center mt-4">{sucessMsg}</p>}
  </form>
</div>

    </>
  );
};

export default ForgetPass;
