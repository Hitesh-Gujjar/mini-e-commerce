import {  useDispatch } from "react-redux";
import ProductList from './pages/ProductList';
import { useEffect } from "react";


const App = () => {
  const dispatch = useDispatch();
  const API_URL = "https://fakestoreapi.com/products";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "ADD_PRODUCT_LIST", payload: data })
      });
  }, []);

  return (
    <ProductList />
  );
};

export default App;
