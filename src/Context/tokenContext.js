import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let tokenContext = createContext();

export function TokenContextProvider({ children }) {
  const [token, setToken] = useState(null);

  // useEffect(() => {
  //   setToken(localStorage.getItem("token"));
  // }, []);
  // useEffect(() => {
  //   setToken(localStorage.getItem("token"));
  // }, [token]);

  // console.log("hello iam layout");
  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {children}
    </tokenContext.Provider>
  );
}
