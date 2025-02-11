import { useDispatch, useSelector } from "react-redux";
import style from "../../App.module.css";
import { memo, useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";

const ProductCard = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const products = useSelector((state: any) => state.productList);
  const [filteredProducts, setFilteredProducts] = useState([]);


  const debouncedSearch = useCallback(
    debounce((term:any) => {
      if (term.trim() === "") {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter((product:any) =>
          product.title.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
    }, 300),
    [products]
  );

  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value:string = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  
  return (
    <>
      <input
        type="text"
        placeholder="Search Item"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ padding: "8px", marginBottom: "10px", width: "50%" }}
      />
      <div className={style.container}>
        {filteredProducts.map((product: any) => (
          <div key={product.id} className={style.card}>
            <img src={product.image} alt={product.title} style={{ width: "100px" }} loading="lazy" />
            <h3>{product.title}</h3>
            <p>₹{product.price}</p>
            <button className={style.addButton} onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default memo(ProductCard)