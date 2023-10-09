import Slider from "react-slick";
import style from "./Category.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategory } from "../../Redux/CategoryReducer";
import { ThreeCircles } from "react-loader-spinner";

function Category() {
  let { isLoading, isError, category } = useSelector((state) => state.category);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, []);
  console.log(category);
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
      <div className="row">
        {category?.data.map((category, index) => {
          return (
            <div className="col-md-2" key={index}>
              <div className="catItem mb-4 p-2">
                <img
                  className="w-100"
                  height={200}
                  src={category.image}
                  alt=""
                />
                <h6 className="py-2 h6">{category.name}</h6>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Category;
