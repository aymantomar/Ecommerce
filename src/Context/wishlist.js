import axios from "axios";
import { createContext, useState } from "react";

export let wishlistContext = createContext();
let headers = {
  token: localStorage.getItem("token"),
};

export default function WishlistContextProvider({ children }) {
  let [wishQuantity, setWishQuantity] = useState(0);

  function wishCountControl(count) {
    setWishQuantity(count);
  }

  async function addWishList(productId) {
    try {
      let data = axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId,
        },
        { headers }
      );
      return data;
    } catch (error) {
      return error;
    }
  }
  async function removeWishList(productId) {
    try {
      let data = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,

        { headers }
      );
      return data;
    } catch (error) {
      return error;
    }
  }

  async function getUserWish() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers }
      );
      // console.log("iam from wishlist context ", data);
      setWishQuantity(data.count);
      return data;
    } catch (error) {
      return error;
    }
  }

  return (
    <wishlistContext.Provider
      value={{
        addWishList,
        wishCountControl,
        getUserWish,
        removeWishList,
        wishQuantity,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
