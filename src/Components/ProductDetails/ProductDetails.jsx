import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import { CartContext } from "../Context/CartContext";

const ProductDetails = () => {
  const { addToCart, getCartItems, looding: lood } = useContext(CartContext);
  let [details, setDetails] = useState();
  let [svg, setSvg] = useState();
  let [looding, setLooding] = useState(false);
  const x = useParams();
  useEffect(() => {
    getCartItems();
  }, []);
  async function getProductsDetails() {
    try {
      setLooding(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${x.id}`
      );
      setDetails(data.data);
      setSvg(data.data.ratingsAverage);
      setLooding(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLooding(false);
    }
  }
  let rating = Math.floor(svg);

  useEffect(() => {
    getProductsDetails();
  }, []);

  return (
    <>
      <Helmet>
        <title>ProductDetails</title>
      </Helmet>
      {lood ? (
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
        <div className="container mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
          <div className="md:col-span-3 p-3">
            <Swiper loop={true}>
              {details?.images.map((cat, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center">
                    <img
                      src={cat}
                      className="w-full max-w-[400px] md:max-w-[500px] rounded-lg"
                      alt="Product Image"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
      
          <div className="md:col-span-5 flex flex-col justify-center p-4">
            <h2 className="text-2xl font-semibold text-gray-900">{details?.title}</h2>
            <p className="pt-3 pb-3 text-gray-700">{details?.description}</p>
            <span className="text-lg font-bold text-green-600">{details?.price} EGP</span>
      
            <div className="flex items-center space-x-1 rtl:space-x-reverse mt-3">
              {Array.from({ length: rating }, (_, index) => (
                <svg
                  key={index}
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
              <span className="text-gray-600">{details?.ratingsAverage}</span>
            </div>
      
            <button
              onClick={() => addToCart(x.id)}
              className="w-full mt-5 p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
            >
              + Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      )}
    </>
  );
};

export default ProductDetails;
