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

  function goUp() {
    window.scrollTo(0, 0);
  }
  return (
    <>
      <Navbar />
      <div className="container py-4">
        <Outlet />
        <div
          onClick={() => goUp()}
          className="cursor-pointer d-flex align-items-center justify-content-center goTop position-fixed   bg-main text-light "
        >
          <i className="fa-solid fa-angle-up"></i>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
