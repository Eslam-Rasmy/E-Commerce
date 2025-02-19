import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { WithContext } from "../Context/WithContext";

const ProductCard = (props) => {
  const { addToCart } = useContext(CartContext);
  const { addToWith, deleteWithItem, allItemsWith, getWithItems, looding } =
    useContext(WithContext);
  const { title, price, _id, imageCover, ratingsAverage, category } =
    props.product;

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(allItemsWith.some((item) => item._id === _id));
  }, [allItemsWith, _id]);

  const handleAddToWishlist = async () => {
    await addToWith(_id);
    getWithItems();
  };

  const handleRemoveFromWishlist = async () => {
    await deleteWithItem(_id);
    getWithItems();
  };
  useEffect(() => {
    getWithItems();
  }, []);
  let rating = Math.floor(ratingsAverage);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/details/${_id}`}>
        <div>
          <img
            className="p-8 rounded-t-lg w-full h-[400px]"
            src={imageCover}
            alt="product image"
          />
        </div>
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight mb-4 text-gray-900 dark:text-green-500">
            {category.name}
          </h5>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title.slice(0, 30) + "..."}
          </h5>
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {Array.from({ length: rating }, (_, index) => (
                <svg
                  key={index}
                  className="w-4 h-4 text-yellow-300"
                  viewBox="0 0 22 20"
                  fill="currentColor"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
              {ratingsAverage}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {price} EGP
            </span>
          </div>
        </div>
      </Link>

      <div className="flex justify-center items-center">
        <button
          onClick={() => addToCart(_id)}
          className="mx-auto w-50 m-6 block cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          +Add to cart
        </button>

        {isInWishlist ? (
          <svg
            onClick={handleRemoveFromWishlist}
            className="text-red-500 cursor-pointer"
            height="30"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
          </svg>
        ) : (
          <svg
            onClick={handleAddToWishlist}
            className="text-red-500 cursor-pointer"
            height="30"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
          </svg>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
