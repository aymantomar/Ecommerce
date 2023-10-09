import { Link } from "react-router-dom";
import style from "./NotAuthorised.module.css";

function NotAuthorised() {
  return (
    <>
      <div className="row">
        <div className="col-md-12 text-center">
          <div className="warning">
            <i
              className="text-main fa-solid fa-hand "
              style={{ fontSize: "10rem" }}
            ></i>

            <h1 className="my-4">
              Sorry you are not allowed to see this page.... !
            </h1>
            <h2>if you want to see it... pls login first!...</h2>
            <Link to={"/Login"} className="my-4 text-white btn bg-main">
              Login now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotAuthorised;
