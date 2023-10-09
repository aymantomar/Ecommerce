import HomeCategory from "../HomeCategory/HomeCategory";
import HomeProducts from "../HomeProducts/HomeProducts";
import HomeSlider from "../HomeSlider/HomeSlider";
import style from "./Home.module.css";

function Home() {
  return (
    <>
      <HomeSlider />
      <HomeCategory />
      <HomeProducts />
    </>
  );
}

export default Home;
