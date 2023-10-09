import HomeCategory from "../HomeCategory/HomeCategory";
import HomeProducts from "../HomeProducts/HomeProducts";
import HomeSlider from "../HomeSlider/HomeSlider";
import style from "./Home.module.css";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart | Home</title>
      </Helmet>
      <HomeSlider />
      <HomeCategory />
      <HomeProducts />
    </>
  );
}

export default Home;
