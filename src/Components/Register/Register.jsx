import { Formik, useFormik, validateYupSchema } from "formik";
import style from "./Register.module.css";
import * as Yup from "yup";
import { useRef } from "react";
import { getRegisterData } from "../../Redux/RegisterReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Register() {
  const regPassword = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/;
  const regPhone = /^01[0125][0-9]{8}$/gi;
  const dispatch = useDispatch();

  let { data } = useSelector((state) => state.register);

  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "minimum number is 3")
      .max(10, "maximum number is 10")
      .required("pls enter your name"),

    email: Yup.string().email().required("pls enter valid email"),
    password: Yup.string()
      .matches(
        regPassword,
        "must contains 1 number and 1 character ...maximum 6 characters"
      )
      .required("pls enter valid password"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")])
      .required("must be identical with passwrod"),
    phone: Yup.string()
      .matches(regPhone, "pls enter valid number like 01012345678")
      .required("pls enter valid egyption number"),
  });
  let navigate = useNavigate();
  async function handleSubmit(values) {
    dispatch(getRegisterData(values));
    navigate("/Login");
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label className="w-100 text-start" htmlFor="name">
          Name:
        </label>
        <input
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          type="text"
          className=" my-3 form-control"
          id="name"
        />
        {formik.errors.name && formik.touched.name ? (
          <div className="alert alert-danger">{formik.errors.name}</div>
        ) : (
          ""
        )}
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
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger">{formik.errors.email}</div>
        ) : (
          ""
        )}
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
        {formik.errors.password && formik.touched.password ? (
          <div className="alert alert-danger">{formik.errors.password}</div>
        ) : (
          ""
        )}
        <label className="w-100 text-start" htmlFor="Repassword">
          Repassword:
        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rePassword}
          type="password"
          className="my-3 form-control"
          id="rePassword"
          name="rePassword"
        />
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div className="alert alert-danger">{formik.errors.rePassword}</div>
        ) : (
          ""
        )}
        <label className="w-100 text-start" htmlFor="phone">
          phone:
        </label>
        <input
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          type="text"
          className="  my-3 form-control"
          id="phone"
        />
        {formik.errors.phone && formik.touched.phone ? (
          <div className="alert alert-danger">{formik.errors.phone}</div>
        ) : (
          ""
        )}
        <div className="submit text-start my-3">
          <button
            type="submit"
            className={
              formik.isValid && formik.dirty
                ? "btn bg-main text-white "
                : "btn bg-main text-white disabled"
            }
          >
            Register Now
          </button>
        </div>
      </form>
    </>
  );
}

export default Register;
