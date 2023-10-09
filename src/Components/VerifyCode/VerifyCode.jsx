import { useFormik } from "formik";
import style from "./VerifyCode.module.css";
import * as yup from "yup";
import { useContext, useState } from "react";
import { passwordContext } from "../../Context/forgetPassword";
import { FallingLines } from "react-loader-spinner";

import { Navigate, useNavigate } from "react-router-dom";
function VerifyCode() {
  let { confirmVerifyCode } = useContext(passwordContext);

  let [dataStatus, setDataStatus] = useState(null);

  let [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  async function handleSubmit(values) {
    let response = await confirmVerifyCode(values);
    console.log(response);
    if (response.data.status === "Success") {
      navigate("/ResetPassword");
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },

    onSubmit: handleSubmit,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="text">Verify code: </label>
        <input
          id="text"
          name="resetCode"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.resetCode}
          className="form-control"
          type="text"
          placeholder="pls enter your code"
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

export default VerifyCode;
