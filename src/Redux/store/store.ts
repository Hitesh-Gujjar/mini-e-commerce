import { combineReducers, createStore } from "redux";
import cartItemReducer from "../reducer/CartReducer";
import productItemReducer from "../reducer/ProductDataReducer";


const rootReducer = combineReducers({
    cart: cartItemReducer,
    productList: productItemReducer,
  });
  
const store = createStore(rootReducer);

export default store;