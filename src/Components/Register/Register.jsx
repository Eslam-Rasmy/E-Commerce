import { useFormik } from "formik";
import React, { use, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Resigster = () => {
  let [msg,setMsg] = useState(null)
  let [sucessMsg,setSucessMsg] = useState(null)
  let [looding,setLooding] = useState(false)
  const navigate = useNavigate()

 async function register(values){
  setMsg(null)
  setSucessMsg(null)
  setLooding(true)
  try{
    const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
    setSucessMsg(res.data.message)
    setTimeout(()=>{
      navigate("/login")
    },2000)
  }catch(err){
    setMsg(err.response.data.message)
  }finally{
    setLooding(false)
  }
  
  }
  const validationSchema = yup.object().shape({
    name:yup.string().required("name is required").min(3, "min 3 char").max(20, "max is 20 char"),
    email:yup.string().required("email is required").email("please enter valid email"),
    password:yup.string().required("password is required").matches(/^[A-z0-9_]{6,30}$/, "from 6 to 30 max"),
    rePassword:yup.string().required("rePassword is required").oneOf([yup.ref('password')],"rePossword not matches password"),
    phone:yup.string().required("phone is required").matches(/^01[1250][0-9]{8}$/, "Egyption numbers only"),
   }); 
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit:register,
        validationSchema,
        validateOnMount:true,
     
  });

  return (
    <>
    <Helmet>
      <title>Sign up</title>
    </Helmet>
    <div className="container mx-auto mt-6 px-4">
        <form
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
          onSubmit={formik.handleSubmit}
        >
          <p className="py-2.5 mb-6 text-2xl sm:text-4xl font-medium text-center">
            Register Now
          </p>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full py-2.5 px-4 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your name"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.name && formik.touched.name && (
            <div className="p-3 mb-4 text-sm bg-red-400 text-white rounded-lg" role="alert">
              <span className="font-medium">Error:</span> {formik.errors.name}
            </div>
          )}

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
            <div className="p-3 mb-4 text-sm bg-red-400 text-white rounded-lg" role="alert">
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
            <div className="p-3 mb-4 text-sm bg-red-400 text-white rounded-lg" role="alert">
              <span className="font-medium">Error:</span> {formik.errors.password}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              className="block w-full py-2.5 px-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Confirm your password"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="p-3 mb-4 text-sm bg-red-400 text-white rounded-lg" role="alert">
              <span className="font-medium">Error:</span> {formik.errors.rePassword}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              className="block w-full py-2.5 px-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your phone"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <div className="p-3 mb-4 text-sm bg-red-400 text-white rounded-lg" role="alert">
              <span className="font-medium">Error:</span> {formik.errors.phone}
            </div>
          )}

          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className={`cursor-pointer w-full py-2.5 text-white font-medium rounded-lg text-sm ${
              !formik.isValid || formik.isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {looding ? "Loading..." : "Register Now"}
          </button>

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
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
      </div>

    </> 
  );
};

export default Resigster;
