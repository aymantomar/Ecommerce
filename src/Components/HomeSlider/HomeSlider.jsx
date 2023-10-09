import Slider from "react-slick";
import style from "./HomeSlider.module.css";
import sliderImg1 from "../../Assests/images/slider-image-1.jpeg";
import sliderImg2 from "../../Assests/images/slider-image-2.jpeg";
import sliderImg3 from "../../Assests/images/slider-image-3.jpeg";

import groceryImg1 from "../../Assests/images/grocery-banner.png";
import groceryImg2 from "../../Assests/images/grocery-banner-2.jpeg";

function HomeSlider() {
  const settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      <div className="row g-0">
        <div className="col-md-10">
          <Slider {...settings}>
            <img
              height={400}
              className="w-100"
              src={sliderImg1}
              alt="slider image1"
            />
            <img
              height={400}
              className="w-100"
              src={sliderImg2}
              alt="slider image2"
            />
            <img
              height={400}
              className="w-100"
              src={sliderImg3}
              alt="slider image3"
            />
          </Slider>
        </div>
        <div className="col-md-2">
          <img
            height={200}
            className="w-100 "
            src={groceryImg1}
            alt="groccery image4"
          />
          <img
            height={200}
            className=" w-100"
            src={groceryImg2}
            alt="groccery image5"
          />
        </div>
      </div>
    </>
  );
}

export default HomeSlider;
