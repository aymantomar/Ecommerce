import { Navigate } from "react-router-dom";
import style from "./ProtectedRoute.module.css";

function ProtectedRoute({ children }) {
  if (localStorage.getItem("token")) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/NotAuthorised"} />;
  }
}

export default ProtectedRoute;
