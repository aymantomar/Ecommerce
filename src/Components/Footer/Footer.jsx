import style from "./Footer.module.css";

import amazon from "../../Assests/images/amazon-pay.png";
import american from "../../Assests/images/american-express.png";
import card from "../../Assests/images/card.png";
import paypal from "../../Assests/images/paypal.png";

import appstores from "../../Assests/images/app-store-png-logo-33115.png";

function Footer() {
  return (
    <>
      <div className="bg-light py-5 mt-3">
        <div className="container">
          <div className="row">
            <h3 className="text-start">Get the FreshCart app</h3>
            <p className="h6 text-start mb-3">
              We will send you a link, open it on your phone to download the
              app.
            </p>
            <form className="row">
              <div className="col-md-10">
                <label htmlFor="inputPassword2" className="visually-hidden">
                  Password
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputPassword2"
                  placeholder="Email"
                />
              </div>
              <div className="col-md-2 text-end">
                <button type="submit" className="btn mb-3 bg-main text-white">
                  share App Link
                </button>
              </div>
            </form>
            <div className="col-12">
              <div className="border-top border-bottom py-4 mt-3">
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="align-items-center">
                      Payment Partner |
                      <img
                        className="mx-3 object-fit-contain"
                        width={40}
                        height={40}
                        src={card}
                        alt=""
                      />
                      <img
                        className="mx-3 object-fit-contain"
                        width={60}
                        height={60}
                        src={amazon}
                        alt=""
                      />
                      <img
                        className="mx-3 object-fit-contain"
                        width={30}
                        height={30}
                        src={american}
                        alt=""
                      />
                      <img
                        className="mx-3 object-fit-contain"
                        width={40}
                        height={40}
                        src={paypal}
                        alt=""
                      />
                    </div>
                  </div>
                  <div>
                    Get deliveries with FreshCart{" "}
                    <img
                      width={200}
                      height={40}
                      className="object-fit-contain"
                      src={appstores}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
