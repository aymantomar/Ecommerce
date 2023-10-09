import { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { cartContext } from "../../Context/cart";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";

function Cart() {
  let {
    deleteUserCart,
    countControl,
    getUserCart,
    deleteUserProduct,
    updateUserProduct,
  } = useContext(cartContext);

  let [cartProduct, setCartProuct] = useState(null);

  async function getUserData() {
    let { data } = await getUserCart();

    setCartProuct(data);
  }

  async function deleteUserData(productId) {
    let { data } = await deleteUserProduct(productId);
    // console.log(data.data.products.length);
    console.log();
    countControl(data.data.products.length);

    setCartProuct(data.data);
  }

  async function clearAllCart() {
    let data = await deleteUserCart();
    // setCartProuct(data.data);

    if (data.data.message === "success") {
      // setCartLength(0);
      setCartProuct(null);
      console.log(cartProduct);
    }
  }

  async function quantityControl(productId, count) {
    let { data } = await updateUserProduct(productId, count);

    setCartProuct(data.data);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {}
      {cartProduct ? (
        <>
          <h2>SHOP CART</h2>
          <div className="d-flex justify-content-between">
            <h4 className="text-main">
              Total Cart Price is {cartProduct?.totalCartPrice} EGP
            </h4>
            <button
              onClick={() => clearAllCart()}
              className="px-3 btn bg-danger text-white"
            >
              <i className=" fa-solid fa-trash me-2"></i>
              Clear All
            </button>
          </div>
          <div className=" mt-5 bg-light p-3">
            {cartProduct?.products.map((product) => {
              return (
                <>
                  <div
                    className="row border-bottom pb-3 mb-3"
                    key={product?.product.id}
                  >
                    <div className="col-md-1">
                      <img
                        className="w-100"
                        src={product.product.imageCover}
                        alt="product "
                      />
                    </div>
                    <div className="col-md-11 mb-4 mt-3 d-flex justify-content-between">
                      <div className="details">
                        <h4 className="h6">
                          {product.product.title
                            .split(" ")
                            .slice(0, 2)
                            .join(" ")}
                        </h4>
                        <h5 className="text-main h6">{product.price} EGP</h5>
                        <span
                          className="cursor-pointer"
                          onClick={() => deleteUserData(product.product.id)}
                        >
                          <i className="text-main fa-solid fa-trash"></i> Remove
                        </span>
                      </div>
                      <div className="mt-3">
                        <button
                          onClick={() =>
                            quantityControl(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="border border-1 bg-main text-white px-2 rounded-2"
                        >
                          +
                        </button>
                        <span className="mx-2">{product.count}</span>
                        <button
                          onClick={() =>
                            quantityControl(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          className="border border-1 bg-main text-white px-2 rounded-2"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            <h6 className="border-bottom py-4">
              {" "}
              <i className="fa-solid fa-cart-shopping text-success"></i> Payment
              Method
            </h6>
            <div className="row pt-3 justify-content-between px-3">
              <Link
                to={"/OnlinePaymentDetails"}
                className="btn bg-main text-light col-12 col-md-2 mb-4 mb-md-0"
              >
                <i className="fa-brands fa-cc-visa"></i> Checkout Online
              </Link>
              <Link
                to={"/PurshaseDetails"}
                className="btn bg-main text-white col-12 col-md-2"
              >
                {" "}
                <i className="fa-solid fa-money-bill"></i> Cash on Devilry
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="loading d-flex align-content-center justify-content-center text-center w-100">
          <div className=" w-100 bg-light py-5 border border-1 text-center text-main">
            <i
              style={{ fontSize: "4rem" }}
              className=" fa-solid fa-cart-plus"
            ></i>
            <h2 className="bg-light ">Cart is empty....</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
