import Slider from "react-slick";
import style from "./HomeCategory.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategory } from "../../Redux/CategoryReducer";
import { ThreeCircles } from "react-loader-spinner";

function HomeCategory() {
  let { isLoading, isError, category } = useSelector((state) => state.category);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
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
        <div className="row g-0 my-5">
          <h1>shop popuolar Category</h1>
          <Slider {...settings}>
            {category?.data.map((category) => {
              return (
                <div className="col-md-2" key={category._id}>
                  <div className="category">
                    <img
                      className="w-100"
                      height={200}
                      src={category.image}
                      alt={category.name}
                    />
                    <h5 className="h6 my-2">{category.name}</h5>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      )}
    </>
  );
}

export default HomeCategory;
