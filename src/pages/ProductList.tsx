
import CartItems from "./partial/CartItems";
import style from "../App.module.css";
import ProductCard from "./partial/ProductCard";


const ProductList = () => {

  return (
    <div className={style.maincontainer}>
      <CartItems></CartItems>
      <ProductCard></ProductCard>
    </div>
  );
};

export default ProductList;
