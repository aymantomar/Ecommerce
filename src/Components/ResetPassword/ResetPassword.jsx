import { useFormik } from "formik";
import style from "./ResetPassword.module.css";
import * as yup from "yup";
import { useContext, useState } from "react";
import { passwordContext } from "../../Context/forgetPassword";
import { FallingLines } from "react-loader-spinner";

import { Navigate, useNavigate } from "react-router-dom";
function ResetPassword() {
  let { resetPassword } = useContext(passwordContext);

  let [dataStatus, setDataStatus] = useState(null);

  let [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  async function handleSubmit(values) {
    let response = await resetPassword(values);
    console.log(response);
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },

    onSubmit: handleSubmit,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">email : </label>
        <input
          id="email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          className="form-control"
          type="text"
          placeholder="pls enter your email"
        />
        <label htmlFor="newPassword">new Password: </label>
        <input
          id="newPassword"
          name="newPassword"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          className="form-control"
          type="password"
          placeholder="pls enter your new Password"
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
          <button
            disabled={!(formik.dirty && formik.isValid)}
            type="submit"
            className="my-4 btn bg-main text-light"
          >
            verify
          </button>
        )}
      </form>
    </>
  );
}

export default ResetPassword;
