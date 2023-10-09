import { useDispatch, useSelector } from "react-redux";

import style from "./Products.module.css";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { getProducts } from "../../Redux/ProductsReducer";
import { cartContext } from "../../Context/cart";
import toast from "react-hot-toast";
import { wishlistContext } from "../../Context/wishlist";

function Products() {
  let { isLoading, products } = useSelector((state) => state.products);
  let dispatch = useDispatch();
  let { countControl, addToCart } = useContext(cartContext);
  let { wishCountControl, addWishList } = useContext(wishlistContext);

  async function getWishList(id) {
    let data = await addWishList(id);
    console.log(data.data.data.length);

    if (data.data.status === "success") {
      console.log("iam from add wisth", data);

      toast.success(data.data.message);
    }
    wishCountControl(data.data.data.length);
  }

  async function getCart(productId) {
    let data = await addToCart(productId);

    if (data?.status === "success") {
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }

    countControl(data.data.products.length);
  }

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loading d-flex align-content-center justify-content-center text-center w-100">
          <ThreeCircles
            height="150"
            width="150"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      ) : (
        <div className="row my-3">
          {products?.data.map((product) => {
            return (
              <div className="col-md-2" key={product._id}>
                <div className="product position-relative">
                  <div
                    onClick={() => getWishList(product._id)}
                    className="icon cursor-pointer me-3 my-3 position-absolute top-0 end-0"
                  >
                    <i className="fa-regular fs-5 fa-heart text-main"></i>
                  </div>
                  <Link to={`/ProductDetails/${product._id}`}>
                    <img
                      className="w-100"
                      src={product.imageCover}
                      alt={product.category.name}
                    />
                    <h6 className="text-main">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h6>
                    <h6>{product.category.name}</h6>
                    <div className="price-rating d-flex justify-content-between align-items-center">
                      <h6>{product.price} EGP</h6>
                      <h6 className="my-2">
                        ${product.ratingsAverage}{" "}
                        <i className="fas fa-star rating-color"></i>
                      </h6>
                    </div>
                  </Link>
                  <button
                    onClick={() => getCart(product._id)}
                    className="w-100 btn  bg-main text-light"
                  >
                    add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Products;
