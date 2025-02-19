import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState,useEffect } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const Order = () => {
   const {getCartItems} = useContext(CartContext)

  useEffect(()=>{
        getCartItems()
      },[])



  const navigate = useNavigate();
  const { cardId, setNumOfCart } = useContext(CartContext);
  const [paymentWay, setPaymentWay] = useState();
  const [looding, setLooding] = useState(false);

  function handleSubmit(values) {
  const formattedValues = {
    shippingAddress: {
      details: values.details,
      phone: values.phone,
      city: values.city,
    },
  };

  if (paymentWay === "cash") {
    cashOrder(formattedValues);
  } else if (paymentWay === "visa") {
    visaOrder(formattedValues);
  }
}


  async function cashOrder(values) {
    try {
      console.log(values);
      
      setLooding(true);
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cardId}`,
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.status == "success") {
        setLooding(false);
        toast.success("order Cash Success");
        setNumOfCart(0);
        setTimeout(() => {
          navigate("/allOrders");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      console.log("caassshhh");
    } finally {
      setLooding(false);
    }
  }

  async function visaOrder(values) {
    try {
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${window.location.origin}`,
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      window.open(res.data.session.url,"_blank")
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  
  const validationSchema = yup.object().shape({
    details:yup.string().required("details is required").min(3, "min 3 char").max(20, "max is 20 char"),
    phone:yup.string().required("phone is required").matches(/^01[1250][0-9]{8}$/, "Egyption numbers only"),
    city:yup.string().required("city is required").min(3, "min 3 char").max(20, "max is 20 char"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
    validateOnMount: true,
  });
  

  return (
    <>
      <Helmet>
        <title>Order</title>
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
      <div className="container mx-auto p-10 m-10">
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="details"
              id="details "
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}

            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Details :
            </label>
          </div>
          {formik.errors.details && formik.touched.details ? (
            <div
            className="p-4 mb-6 text-sm rounded-lg bg-red-400 text-red-800"
            role="alert"
            >
              <span className="font-medium">Danger alert!</span> {formik.errors.details}
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone "
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}

            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              phone :
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone ? (
            <div
            className="p-4 mb-6 text-sm rounded-lg bg-red-400 text-red-800"
            role="alert"
            >
              <span className="font-medium">Danger alert!</span> {formik.errors.phone}
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="city"
              id="city "
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}

            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City :
            </label>
          </div>
          {formik.errors.city && formik.touched.city ? (
            <div
            className="p-4 mb-6 text-sm rounded-lg bg-red-400 text-red-800"
            role="alert"
            >
              <span className="font-medium">Danger alert!</span> {formik.errors.city  }
            </div>
          ) : null}
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            onClick={() => setPaymentWay("cash")}
            className={`cursor-pointer text-white focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ${!formik.isValid || formik.isSubmitting
              ? "bg-gray-400"
              : "bg-yellow-400 hover:bg-yellow-500"}`}
          >
            Cash Order
          </button>
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            onClick={() => setPaymentWay("visa")}
            className={`cursor-pointer text-white focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 ${!formik.isValid || formik.isSubmitting
              ? "bg-gray-400"
              : "bg-purple-400 hover:bg-purple-500"}`}
          >
            Visa Order
          </button>
        </form>
      </div>
    </>
  );
};

export default Order;
