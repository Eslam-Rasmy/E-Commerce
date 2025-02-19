import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../Context/CartContext";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [looding, setLooding] = useState(false);
  const { getCartItems } = useContext(CartContext);
  let id = jwtDecode(localStorage.getItem("token")).id;

  async function getAllOrders() {
    try {
      setLooding(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setAllOrders(data);
      setLooding(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLooding(false);
    }
  }
  useEffect(() => {
    getAllOrders();
    getCartItems();
  }, []);
  return (
    <>
      <Helmet>
        <title> AllOrders</title>
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
        <div className="container mx-auto min-h-screen w-full p-5">
          <p className=" text-3xl text-gray-500 text-center m-10 sm:text-4xl md:text-4xl lg:text-5xl">
            My Orders
          </p>

          {allOrders.length == 0 ? (
            <div className="text-3xl text-center text-green-500">No order done</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {allOrders?.map((order) => (
                <div
                  key={order._id}
                  className="flex flex-col m-5 bg-white border border-gray-200 rounded-lg shadow-sm md:max-w-xl"
                >
                  {order.cartItems.map((sub, subIndex) => (
                    <div key={sub._id} className="p-5">
                      <img
                        className="object-cover w-full h-60 md:h-auto md:w-full rounded-t-lg"
                        src={sub.product.imageCover}
                        alt=""
                      />
                      <h2 className="text-lg font-bold mt-5">
                        {sub.product.title.slice(0, 12)}
                      </h2>
                      <span>
                        price :
                        <span className="text-green-400">{sub.price} EGP</span>
                      </span>
                      <p>
                        Qty: <span className="text-green-400">{sub.count}</span>
                      </p>
                    </div>
                  ))}

                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      Order Details
                    </h5>
                    <p className="font-normal text-gray-700">
                      Order ID:
                      <span className="text-green-400">{order.id}</span>
                    </p>
                    <h6>
                      Payment:
                      <span className="text-green-400">
                        {order.paymentMethodType}
                      </span>
                    </h6>
                    <span>
                      Phone:
                      <span className="text-green-400">{order.user.phone}</span>
                    </span>
                    <p>
                      Total Price:
                      <span className="text-green-400">
                        {order.totalOrderPrice}EGP
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllOrders;
