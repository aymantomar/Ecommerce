import axios from "axios";
import { createContext } from "react";

export let passwordContext = createContext();

export default function PasswordContextProvider({ children }) {
  async function sendVerificationCode(values) {
    try {
      let data = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );

      return data;
    } catch (error) {
      return error;
    }
  }
  async function confirmVerifyCode(values) {
    try {
      let data = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );

      return data;
    } catch (error) {
      return error;
    }
  }
  async function resetPassword(values) {
    try {
      let data = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      );

      return data;
    } catch (error) {
      return error;
    }
  }

  return (
    <passwordContext.Provider
      value={{ sendVerificationCode, confirmVerifyCode, resetPassword }}
    >
      {children}
    </passwordContext.Provider>
  );
}
