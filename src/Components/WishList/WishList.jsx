import { useContext, useEffect, useState } from "react";
import style from "./WishList.module.css";
import { wishlistContext } from "../../Context/wishlist";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/cart";
import toast from "react-hot-toast";

function WishList() {
  let { wishCountControl, getUserWish, removeWishList } =
    useContext(wishlistContext);
  let { countControl, addToCart } = useContext(cartContext);
  let [wishItems, setWishItems] = useState(null);

  async function getCart(productId) {
    let data = await addToCart(productId);
    if (data?.status === "success") {
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
    countControl(data.data.products.length);
    return data;
  }

  async function removeFromWish(id) {
    let data = await removeWishList(id);
    console.log(data.data.data.length);
    wishCountControl(data.data.data.length);
    getUserWishList();
    return data;
  }

  async function getUserWishList() {
    let { data } = await getUserWish();

    setWishItems(data);
  }
  useEffect(() => {
    getUserWishList();
  }, []);

  return (
    <>
      <div className="row">
        {wishItems?.map((product) => {
          return (
            <div className="col-md-2" key={product._id}>
              <div className="product position-relative">
                <div
                  onClick={() => removeFromWish(product._id)}
                  className="icon cursor-pointer me-3 my-3 position-absolute top-0 end-0"
                >
                  <i className="fa-solid fs-5 fa-heart text-main"></i>
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
    </>
  );
}

export default WishList;
