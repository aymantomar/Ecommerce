import axios from "axios";
import { createContext } from "react";

export let loginContext = createContext();

export function LoginContextProvider({ children }) {
  async function getData(values) {
    let data = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      values
    );
    return data;
  }
  return (
    <loginContext.Provider value={{ getData }}>
      {children}
    </loginContext.Provider>
  );
}
