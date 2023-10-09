import { configureStore } from "@reduxjs/toolkit";
import { RegisterSlice } from "./RegisterReducer";
import { LoginSlice } from "./LoginReducer";
import { categorySlice } from "./CategoryReducer";
import { homeProductSlice } from "./HomeProducts";
import { productDetailsSlice } from "./ProductDetailsReducer";
import { productsSlice } from "./ProductsReducer";
import { brandsSlice } from "./BrandsReducer";

export let store = configureStore({
  reducer: {
    register: RegisterSlice,
    login: LoginSlice,
    category: categorySlice,
    homeProducts: homeProductSlice,
    productDetails: productDetailsSlice,
    products: productsSlice,
    brands: brandsSlice,
  },
});
