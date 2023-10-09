import Slider from "react-slick";
import style from "./Brands.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { ThreeCircles } from "react-loader-spinner";
import { getBrands } from "../../Redux/BrandsReducer";

function Brands() {
  let { isLoading, isError, brands } = useSelector((state) => state.brands);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: false,
  };
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
        <div className="row">
          {brands?.data.map((brand, index) => {
            return (
              <div className="col-md-2" key={index}>
                <div className="catItem mb-4 p-2">
                  <img className="w-100" src={brand.image} alt="" />
                  <h6 className="text-center py-2 h6">{brand.name}</h6>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Brands;
