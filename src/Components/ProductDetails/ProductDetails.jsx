import { useParams } from "react-router-dom";
import style from "./ProductDetails.module.css";
import { createContext, useContext } from "react";
import { getproductDetailsData } from "../../Redux/ProductDetailsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Slider from "react-slick";
import { ThreeCircles } from "react-loader-spinner";
import { addToCart, cartContext } from "../../Context/cart";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

function ProductDetails() {
  let { id } = useParams();
  let dispatch = useDispatch();
  let { countControl, addToCart } = useContext(cartContext);
  const settings = {
    arrows: false,
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getCart(productId) {
    let data = await addToCart(productId);
    if (data?.status === "success") {
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
    countControl(data.data.products.length);
  }

  let { isLoading, productDetails } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    dispatch(getproductDetailsData(id));
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
        <div className="row d-flex align-items-center justify-content-center">
          {productDetails ? (
            <>
              <div className="col-md-4">
                <Slider {...settings}>
                  {productDetails?.data.images.map((image, index) => {
                    return <img src={image} alt="product " key={index} />;
                  })}
                </Slider>
              </div>
              <div className="col-md-8">
                <Helmet>
                  <title>{productDetails?.data.title} | FreshCart</title>
                </Helmet>
                <h4>{productDetails?.data.title}</h4>
                <h6 className="my-3">{productDetails?.data.description}</h6>
                <h6 className="text-main my-3">
                  {productDetails?.data.category.name}
                </h6>
                <div className="price-rating d-flex justify-content-between align-content-center">
                  <h5 className="fw-bold">{productDetails?.data.price} EGP</h5>
                  <h6>
                    {productDetails?.data.ratingsAverage}
                    <i className="fas fa-star rating-color"></i>
                  </h6>
                </div>
                <button
                  onClick={() => getCart(productDetails.data.id)}
                  className="my-3 btn bg-main text-white w-100"
                >
                  <i class="fa-solid fa-cart-plus"></i> add to cart
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default ProductDetails;
