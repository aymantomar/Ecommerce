import logo from "./logo.svg";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Category from "./Components/Category/Category";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import Profile from "./Components/Profile/Profile";
import WishList from "./Components/WishList/WishList";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import { QueryClient, QueryClientProvider } from "react-query";
import { loginContext, LoginContextProvider } from "./Context/loginContext";
import { TokenContextProvider } from "./Context/tokenContext";
import NotAuthorised from "./Components/NotAuthorised/NotAuthorised";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import AddToCartProvider from "./Context/cart";
import CartProvider from "./Context/cart";
import { Toaster } from "react-hot-toast";
import { Offline } from "react-detect-offline";
import PurshaseDetails from "./Components/PurshaseDetails/PurshaseDetails";
import Allorders from "./Components/Allorders/Allorders";
import OnlinePaymentDetails from "./Components/OnlinePaymentDetails/OnlinePaymentDetails";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import PasswordContextProvider from "./Context/forgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import WishlistContextProvider from "./Context/wishlist";

function App() {
  let queryProvider = new QueryClient();
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/Home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <Allorders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/OnlinePaymentDetails",
          element: (
            <ProtectedRoute>
              <OnlinePaymentDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/ForgetPassword",
          element: <ForgetPassword />,
        },
        {
          path: "/Brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/PurshaseDetails",
          element: (
            <ProtectedRoute>
              <PurshaseDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },

        {
          path: "/ProductDetails/:id",
          element: <ProductDetails />,
        },
        {
          path: "/Category",
          element: (
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          ),
        },
        {
          path: "/WishList",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/ResetPassword",
          element: <ResetPassword />,
        },
        {
          path: "/Profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/VerifyCode",
          element: <VerifyCode />,
        },
        {
          path: "/Register",
          element: <Register />,
        },
        {
          path: "/Login",
          element: <Login />,
        },
        {
          path: "/NotAuthorised",
          element: <NotAuthorised />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <TokenContextProvider>
        <CartProvider>
          <PasswordContextProvider>
            <WishlistContextProvider>
              <LoginContextProvider>
                <QueryClientProvider client={queryProvider}>
                  <RouterProvider router={router}>
                    <Layout />
                  </RouterProvider>
                  <Offline>
                    <div
                      style={{ zIndex: "999" }}
                      className="fs-4 p-4 position-fixed bottom-0 bg-light "
                    >
                      <i className="fas text-main  fa-wifi "></i>{" "}
                      Reconnecting.....
                    </div>
                  </Offline>
                  <Toaster />
                </QueryClientProvider>
              </LoginContextProvider>
            </WishlistContextProvider>
          </PasswordContextProvider>
        </CartProvider>
      </TokenContextProvider>
    </div>
  );
}

export default App;
