import { useContext, useEffect, useState } from "react";
import style from "./Allorders.module.css";

import { cartContext } from "../../Context/cart";
import jwtDecode from "jwt-decode";

function Allorders() {
  let decoded = jwtDecode(localStorage.getItem("token"));
  let [userOrder, setUserOrder] = useState(null);
  let userId = decoded.id;

  let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  let { getUserOrders } = useContext(cartContext);

  async function getData(Id) {
    let { data } = await getUserOrders(Id);

    setUserOrder(data);
  }
  useEffect(() => {
    getData(userId);
  }, []);
  return (
    <>
      {userOrder?.map((order, index) => {
        return (
          <div className="orderCart mb-5" key={index + 1}>
            <div
              className={
                order.paymentMethodType === "cash"
                  ? "bg-light p-3 border-left-main"
                  : "bg-light p-3 border-left-visa"
              }
            >
              <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                <div className="fw-bold text-main text-capitalize">
                  {" "}
                  <i
                    className={
                      order.paymentMethodType === "cash"
                        ? "fa-solid fa-truck text-main"
                        : "fa-solid fa-truck text-visa"
                    }
                  ></i>{" "}
                  Delivery Status : your order is not deliverd yet !
                </div>
                <div className="fw-bold text-main">
                  <i
                    className={
                      order.paymentMethodType === "cash"
                        ? "fa-regular fa-calendar-days text-main"
                        : "fa-regular fa-calendar-days text-visa"
                    }
                  ></i>{" "}
                  Order Data :{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString(
                        "en-us",
                        options
                      )
                    : ""}
                </div>
                <div className="fw-bold text-main text-capitalize">
                  {" "}
                  Payment method : {order.paymentMethodType}{" "}
                  {order.paymentMethodType === "cash" ? (
                    <i className="fa-solid fa-money-bill text-main"></i>
                  ) : (
                    <i className="fa-brands fa-cc-visa text-visa"></i>
                  )}
                </div>
              </div>
              <div className="row">
                {order.cartItems.map((item, index) => {
                  return (
                    <div className="col-md-3 mb-3" key={index}>
                      <div className="bg-white customShadow p-2 rounded-2 mb-1">
                        <h6 className="text-center text-main">
                          {item.product.title.split(" ").slice(0, 2).join("")}
                        </h6>
                        <div className="d-flex justify-content-evenly">
                          <div className="rounded">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="w-100 rounded-3 shadow-4-strong"
                              width={100}
                              height={100}
                            />
                          </div>
                          <div className="border border-1 p-3">
                            <div>Count : {item.count}</div>
                            <div className="my-2">
                              Rating : {item.product.ratingsAverage}{" "}
                              <i className="fas fa-star rating-color"></i>
                            </div>
                            <div>Price : {item.price} EGP</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pt-3 border-top mt-5">
                <div className="d-flex justify-content-between">
                  <div className="fs-5">
                    {" "}
                    <span>Total Price:</span>{" "}
                    <span
                      className={
                        order.paymentMethodType === "cash"
                          ? "text-main"
                          : "text-visa"
                      }
                    >
                      {order.totalOrderPrice} EGP
                    </span>
                  </div>
                  <div className="fs-5">
                    Username:{" "}
                    <span
                      className={
                        order.paymentMethodType === "cash"
                          ? "text-main"
                          : "text-visa"
                      }
                    >
                      {" "}
                      {order.user.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Allorders;
