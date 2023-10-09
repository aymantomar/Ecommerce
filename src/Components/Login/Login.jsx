import { useFormik } from "formik";
import style from "./Login.module.css";
import * as Yup from "yup";

import { getLoginData } from "../../Redux/LoginReducer";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Circles, FallingLines } from "react-loader-spinner";
import axios from "axios";
import { loginContext } from "../../Context/loginContext";
import { tokenContext } from "../../Context/tokenContext";

function Login() {
  const dispatch = useDispatch();
  let { setToken } = useContext(tokenContext);
  let { data } = useSelector((state) => state.login);
  let [isLoading, setIsLoading] = useState(false);

  let [isError, setIsError] = useState(null);
  let navigate = useNavigate();

  const regPassword = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/;

  let validationSchema = Yup.object({
    email: Yup.string().email().required("pls enter valid email"),
    password: Yup.string()
      .matches(
        regPassword,
        "must contains 1 number and 1 character ...maximum 6 characters"
      )
      .required("pls enter valid password"),
  });

  async function handleLogin(values) {
    let { payload } = await dispatch(getLoginData(values));

    if (payload.message === "success") {
      setIsLoading(false);
      localStorage.setItem("token", payload.token);
      setToken(localStorage.getItem("token"));
      navigate("/Home");
    } else {
      // console.log(payload);
      setIsError(payload.response.data.message);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      {isError ? <div className="alert alert-danger">{isError}</div> : ""}

      <form onSubmit={formik.handleSubmit}>
        <label className="w-100 text-start" htmlFor="email">
          Email:
        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          type="email"
          className=" my-3 form-control"
          id="email"
          name="email"
        />
        <label className="w-100 text-start" htmlFor="password">
          password:
        </label>
        <input
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          type="password"
          className=" my-3 form-control"
          id="password"
        />
        {isLoading ? (
          <button className="disabled btn bg-main">
            <FallingLines
              color="#fff"
              width="40"
              visible={true}
              ariaLabel="falling-lines-loading"
            />
          </button>
        ) : (
          <>
            <button
              type="submit"
              className={
                formik.isValid && formik.dirty
                  ? "btn bg-main text-white "
                  : "btn bg-main text-white disabled"
              }
            >
              Login Now
            </button>
            <Link
              to={"/ForgetPassword"}
              className="ms-3 btn bg-main text-white "
            >
              Forget Password ?
            </Link>
          </>
        )}
      </form>
    </>
  );
}

export default Login;
