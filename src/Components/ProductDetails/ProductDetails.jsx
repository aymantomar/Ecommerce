import { useParams } from "react-router-dom";
import style from "./ProductDetails.module.css";
import { useContext } from "react";
import { getproductDetailsData } from "../../Redux/ProductDetailsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Slider from "react-slick";
import { ThreeCircles } from "react-loader-spinner";

function ProductDetails() {
  let { id } = useParams();
  let dispatch = useDispatch();

  const settings = {
    arrows: false,
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let { isLoading, productDetails } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    dispatch(getproductDetailsData(id));
  }, []);

  console.log(productDetails);
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
              {console.log(productDetails)}
              <div className="col-md-4">
                <Slider {...settings}>
                  {productDetails?.data.images.map((image, index) => {
                    return <img src={image} alt="product " key={index} />;
                  })}
                </Slider>
              </div>
              <div className="col-md-8">
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
                <button className="my-3 btn bg-main text-white w-100">
                  add to cart
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
