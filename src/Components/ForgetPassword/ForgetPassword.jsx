import { useFormik } from "formik";
import style from "./ForgetPassword.module.css";
import * as yup from "yup";
import { useContext, useState } from "react";
import { passwordContext } from "../../Context/forgetPassword";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
function ForgetPassword() {
  let { sendVerificationCode } = useContext(passwordContext);

  let [dataStatus, setDataStatus] = useState(null);

  let [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  async function handleSubmit(values) {
    // setValues(values);
    let response = await sendVerificationCode(values);

    // console.log(response);
    // setDataStatus(response.response.data);

    if (response.data.statusMsg === "success") {
      console.log("ggg");
      navigate("/VerifyCode");
    }
  }

  let validationSchema = yup.object({
    email: yup
      .string()
      .email("enter valid email")
      .required("pls enter valid email"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      {dataStatus === null ? (
        <div className="alert alert-danger">hello</div>
      ) : (
        ""
      )}

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">email: </label>
        <input
          id="email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          className="form-control"
          type="email"
          placeholder="pls enter your email"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="alert alert-danger">{formik.errors.email}</div>
        ) : (
          ""
        )}
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
            send verification code
          </button>
        )}
      </form>
    </>
  );
}

export default ForgetPassword;
