import style from "./NotFound.module.css";
import notFound from "../../Assests/images/Capture-removebg-preview.png";
function NotFound() {
  return (
    <>
      <div className="row">
        <div className="col-md-12 text-center">
          <img src={notFound} alt="not found image" />
        </div>
      </div>
    </>
  );
}

export default NotFound;
