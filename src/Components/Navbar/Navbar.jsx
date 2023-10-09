import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../../Context/tokenContext";
import freshCartlogo from "../../Assests/images/freshcart-logo.svg";
import { cartContext } from "../../Context/cart";
import { wishlistContext } from "../../Context/wishlist";

function Navbar() {
  let { token, setToken } = useContext(tokenContext);
  let { getUserCart, productsLength } = useContext(cartContext);
  let { getUserWish, wishQuantity } = useContext(wishlistContext);

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  }

  //this for update cart quantity number from cart Context
  async function cartQuantity() {
    let { data } = await getUserCart();
  }
  async function wishListQuantity() {
    let data = await getUserWish();
  }
  useEffect(() => {
    cartQuantity();
    wishListQuantity();
  }, []);

  //this for update cart quantity number from cart Context

  return (
    <>
      <nav className="navbar py-4 navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={freshCartlogo} alt="logo image" />
          </a>

          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {token ? (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link to={"/Home"} className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/Products"} className="nav-link">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/Category"} className="nav-link">
                    Category
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/Brands"} className="nav-link">
                    Brands
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/Profile"} className="nav-link">
                    Profile
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {token ? (
                <>
                  <li className="nav-item">
                    <Link
                      onClick={removeToken}
                      className="nav-link"
                      to={"/Login"}
                    >
                      Logout
                    </Link>
                  </li>

                  <li className="nav-item position-relative  mx-4 border border-1">
                    <Link className="nav-link" to={"/Cart"}>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                        {productsLength}
                      </span>
                      <i className=" fa-solid fa-cart-shopping"></i>
                    </Link>
                  </li>

                  <li className="nav-item border position-relative border-1 ">
                    <Link className="nav-link" to={"/Wishlist"}>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                        {wishQuantity}
                      </span>
                      <i className="fa-solid fa-heart"></i>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Login"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Register"}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
