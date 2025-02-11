import ProductCard from "./partial/productCard";
import CartItems from "./partial/CartItems";
import style from "../App.module.css";


const ProductList = () => {

  return (
    <div className={style.maincontainer}>
      <CartItems></CartItems>
      <ProductCard></ProductCard>
    </div>
  );
};

export default ProductList;
