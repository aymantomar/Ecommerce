import { useFormik } from "formik";
import style from "./OnlinePaymentDetails.module.css";
import * as yup from "yup";
import { useContext } from "react";
import { cartContext } from "../../Context/cart";
import jwtDecode from "jwt-decode";

function OnlinePaymentDetails() {
  let { onlinePayment } = useContext(cartContext);

  let phoneRegexp = /^01[0125][0-9]{8}$/gm;

  let validationSchema = yup.object({
    details: yup.string().min(3).max(12).required(),
    phone: yup
      .string()
      .matches(phoneRegexp, "not valid example: 0123456789")
      .required("you must enter egyption valid number"),
    city: yup.string().min(4).max(12).required("pls enter valid city name"),
  });

  async function handleSubmit(values) {
    let { data } = await onlinePayment(values);
    window.location.href = data.session.url;
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details" className="text-capitalize">
          details:{" "}
        </label>
        <input
          className="form-control my-3"
          type="text"
          placeholder="Details"
          name="details"
          id="details"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.details}
        />
        {formik.errors.details && formik.touched.details ? (
          <div className="alert alert-danger">{formik.errors.details}</div>
        ) : (
          ""
        )}

        <label className="text-capitalize" htmlFor="phone">
          phone:{" "}
        </label>
        <input
          className="form-control my-3"
          type="text"
          placeholder="Enter your phone"
          name="phone"
          id="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.errors.phone && formik.touched.phone ? (
          <div className="alert alert-danger">{formik.errors.phone}</div>
        ) : (
          ""
        )}
        <label htmlFor="city" className="text-capitalize">
          city:{" "}
        </label>
        <input
          className="form-control my-3"
          type="text"
          placeholder="Enter your city"
          name="city"
          id="city"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
        {formik.errors.city && formik.touched.city ? (
          <div className="alert alert-danger">{formik.errors.city}</div>
        ) : (
          ""
        )}

        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className="btn bg-main text-light"
        >
          Pay now
        </button>
      </form>
    </>
  );
}

export default OnlinePaymentDetails;
