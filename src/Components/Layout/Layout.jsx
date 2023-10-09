import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import style from "./Layout.module.css";
import Footer from "../Footer/Footer";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../../Context/tokenContext";
function Layout() {
  let { setToken } = useContext(tokenContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="container py-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
