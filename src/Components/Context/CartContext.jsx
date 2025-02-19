import axios from "axios";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();
export default function CartContextProvider({ children }) {
  const [numOfCart, setNumOfCart] = useState();
  const [allItems, setAllItems] = useState([]);
  const [looding, setLooding] = useState(false);
  const [totalPrice, setTotalPrice] = useState();
  const [cardId, setCardId] = useState();

  async function addToCart(productId) {
    try {
      setLooding(true);
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.status == "success") {
        toast.success("It has been successfully added🛺");
      }
      setNumOfCart(res.data.numOfCartItems);
      setLooding(false);
    } catch (err) {
      console.log(err );
      toast.error("Something went wrong");
    } finally {
      setLooding(false);
    }
  }

  async function getCartItems() {
    try {
      setLooding(true);
      const resp = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (resp.data.status == "success") {
        setAllItems(resp.data.data.products);
        setTotalPrice(resp.data.data.totalCartPrice);
        setNumOfCart(resp.data.numOfCartItems);
        setLooding(false);
        setCardId(resp.data.cartId);
      }
    } catch (errr) {
      console.log(errr,"7777");
    } finally {
      setLooding(false);
    }
  }

  async function updateCartItem(id, count) {
    try {
      setLooding(true);
      const respo = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (respo.data.status == "success") {
        setAllItems(respo.data.data.products);
        setTotalPrice(respo.data.data.totalCartPrice);
        setNumOfCart(respo.data.numOfCartItems);
        setLooding(false);
      }
    } catch (eror) {
      console.log(eror);
    } finally {
      setLooding(false);
    }
  }

  async function deleteCartItem(id) {
    try {
      setLooding(true);
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.status == "success") {
        setAllItems(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
        setNumOfCart(response.data.numOfCartItems);
        setLooding(false);
      }
    } catch (er) {
      console.log(er);
    } finally {
      setLooding(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        numOfCart,
        getCartItems,
        allItems,
        looding,
        updateCartItem,
        totalPrice,
        deleteCartItem,
        setLooding,
        setNumOfCart,
        cardId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
