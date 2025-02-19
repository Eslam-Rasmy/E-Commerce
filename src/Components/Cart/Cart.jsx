import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const {
    getCartItems,
    allItems,
    looding,
    updateCartItem,
    totalPrice,
    deleteCartItem,
    setLooding,
  } = useContext(CartContext);
  useEffect(() => {
    getCartItems();
  }, []);
  async function clearCart() {
    try {
      setLooding(true);
      const respon = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (respon.data.message == "success") {
        setLooding(false);
        navigate("/home");
      }
      console.log(respon);
    } catch (errrr) {
      console.log(errrr);
    } finally {
      setLooding(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {looding ? (
        <div
          role="status"
          className=" fixed top-0 start-0 w-full h-full flex justify-center items-center z-50 bg-[rgba(0,0,0,0.5)]"
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
      <div className="container mx-auto p-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 bg-gray-100 p-3 rounded-lg shadow-md">
          Total Prices:
          <span className="text-green-600 text-2xl sm:text-3xl md:text-4xl font-extrabold">
            {totalPrice} EGP
          </span>
        </h2>

        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full min-w-[600px] text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3 text-center">
                  Image
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Product
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Qty
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Price
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-lg">
                    Your Cart is Empty
                  </td>
                </tr>
              ) : (
                allItems.map((cart) => (
                  <tr
                    key={cart.product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4 text-center">
                      <img
                        src={cart.product.imageCover}
                        className="w-12 md:w-20 max-w-full max-h-full mx-auto"
                        alt={cart.product.title}
                      />
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white text-center">
                      {cart.product.title}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          disabled={cart.count === 1}
                          onClick={() =>
                            updateCartItem(cart.product.id, cart.count - 1)
                          }
                          className=" cursor-pointer p-1 text-sm font-medium h-8 w-8 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          -
                        </button>
                        <span className="mx-2 w-8 text-center">
                          {cart.count}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItem(cart.product.id, cart.count + 1)
                          }
                          className="cursor-pointer  p-1 text-sm font-medium h-8 w-8 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white text-center">
                      {cart.price} EGP
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => deleteCartItem(cart.product.id)}
                        className=" cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {allItems.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <Link to="/order">
              <button className="cursor-pointer w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Check Out
              </button>
            </Link>
            <button
              className=" cursor-pointer w-auto sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
