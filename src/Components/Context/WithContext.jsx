import React, { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const WithContext = createContext();
export default function WithContextProvider({ children }) {
  const [num, setNum] = useState([]);
  const [looding, setLooding] = useState(false);
  const [AdrLooding, setAdrLooding] = useState(false);
  const [AdrLooding1, setAdrLooding1] = useState(false);
  const [totalPriceWiht, setTotalPriceWith] = useState();
  const [withId, setWithId] = useState();
  const [allItemsWith, setAllItemsWith] = useState([]);
  const [numOfWith, setNumOfWith] = useState();
  async function addToWith(productId) {
    try {
        setAdrLooding1(true);
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
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
        toast.success("It has been successfully added at WithList");
        setAdrLooding1(false);
      }
      setNum(res?.data.data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
        setAdrLooding1(false);
    }
  }

  async function getWithItems() {
    try {
      setLooding(true);
      const resp = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (resp.data.status == "success") {
        setAllItemsWith(resp.data.data);
        setTotalPriceWith(resp.data.data.totalCartPrice);
        setNumOfWith(resp.data.numOfCartItems);
        setLooding(false);
        setWithId(resp.data.cartId);
      }
    } catch (errr) {
      console.log(errr, "888888");  
    } finally {
      setLooding(false);
    }
  }

  async function deleteWithItem(id) {
    try {
        setAdrLooding(true);
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.status == "success") {
        getWithItems();
        toast.success("It has been successfully remove at WithList");
        setAdrLooding(false);
      }
    } catch (er) {
      console.log(er);
    } finally {
        setAdrLooding(false);
    }
  }

  return (
    <>
      <WithContext.Provider
        value={{
          addToWith,
          getWithItems,
          looding,
          allItemsWith,
          deleteWithItem,
          AdrLooding,
          AdrLooding1
        }}
      >
        {children}
      </WithContext.Provider>
    </>
  );
}
