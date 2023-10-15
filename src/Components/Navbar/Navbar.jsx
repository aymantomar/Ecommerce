import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../../Context/tokenContext";
import freshCartlogo from "../../Assests/images/freshcart-logo.svg";
import { cartContext } from "../../Context/cart";
import { wishlistContext } from "../../Context/wishlist";
import { NavLink } from "react-router-dom";

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
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {token ? (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink to={""} className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/Products"}
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/Category"}
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                  >
                    Category
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/Brands"}
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                  >
                    Brands
                  </NavLink>
                </li>

                {/* <li className="nav-item">
                  <NavLink
                    to={"/Profile"}
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                  >
                    Profile
                  </NavLink>
                </li> */}
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {token ? (
                <>
                  <div className="dropdown">
                    <Link
                      className="btn bg-main border-0 btn-secondary dropdown-toggle text-white"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-regular fa-circle-user text-main text-white"></i>{" "}
                      Welcome User
                    </Link>

                    <ul className="dropdown-menu p-2 small">
                      <li className="nav-item">
                        <Link className="nav-link h6" to="/Profile">
                          <i className="fa-solid fa-address-card"></i> Profile
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link h6" to="allorders">
                          <i className="fa-solid fa-basket-shopping"></i> Order
                          history
                        </Link>
                      </li>
                      <li className="nav-item">
                        <button
                          onClick={() => removeToken()}
                          className="nav-link h6 pointer-event"
                        >
                          <i className="fa-solid fa-right-from-bracket"></i>{" "}
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                  <li className="nav-item position-relative mx-md-4 border border-1">
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
                    <Link className="nav-link" to="/Login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Register">
                      Register
                    </Link>
                  </li>
                </>
              )}

              {/* <li className="nav-item">
                <button
                  className="btn btn-danger rounded-5"
                  onClick={() => setCounter(counter + 1)}
                >
                  +
                </button>
              </li> */}
            </ul>

            {/* <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {token ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      onClick={removeToken}
                      className={({ isActive }) =>
                        isActive ? "active nav-link" : "nav-link"
                      }
                      to={"/Login"}
                    >
                      Logout
                    </NavLink>
                  </li>

                  <li className="nav-item position-relative mx-md-4 border border-1">
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
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
