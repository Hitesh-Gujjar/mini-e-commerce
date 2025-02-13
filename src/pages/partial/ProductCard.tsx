import { useDispatch, useSelector } from "react-redux";
import style from "../../App.module.css";
import { memo,useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import Pagination from "../../components/Pegination";
import { ProductType } from "../../Type/ProductInterface";

const ProductCard = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const products = useSelector((state: any) => state.productList);

  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("all");


  const debouncedSearch = useCallback(
    debounce((term: any) => {
      if (term.trim() === "") {
        setFilteredProducts(products);
        setSortBy("all");
      } else {
        const filtered = products.filter((product: any) =>
          product.title.toLowerCase().includes(term.toLowerCase())
          || product.price?.toString().toLowerCase().includes(term?.toString())
        );
        setFilteredProducts(filtered);
        setSortBy("all");
      }
      setCurrentPage(1);
    }, 300),
    [products]
  );

  const displayProductList = useMemo(() => {
    const startIndex = (currentPage - 1) * 5;
    return filteredProducts.slice(startIndex, startIndex + 5);
  }, [filteredProducts, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const sortOption = [
    { label: 'Sort By', value: 'all' },
    { label: 'Price: Low to High', value: 'LH' },
    { label: 'Price: High to Low', value: 'HL' },
    { label: 'Title', value: 'title' },
  ]

  const sortByAllProperty = (sortBy: string) => {
    
    setFilteredProducts((prevProducts) => {
      const sorted = [...prevProducts]; 
    
      if (sortBy === "LH") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortBy === "HL") {
        sorted.sort((a, b) => b.price - a.price);
      } else if (sortBy === "title") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === "category") {
        sorted.sort((a, b) => a.category.localeCompare(b.category));
      }
    
      return sorted;
    });
    
  };

  const handleSortBy = (value: string) => {
    setSortBy(value);
    sortByAllProperty(value);
  }
  console.log("products", products)
  return (
    <>

      <div className={style.search_Item}>
        <input
          type="text"
          placeholder="Search Item"
          value={searchTerm}
          onChange={handleSearchChange}
          className={style.sortByProperty}
        />

        <select
          value={sortBy}
          className={style.sortByProperty}
          onChange={(e) => handleSortBy(e.target.value)}
        >
          {sortOption.map((op: any) => (
            <option value={op.value}>{op.label}</option>
          ))}
        </select>
      </div>

      <div className={style.container}>
        {displayProductList.map((product: any) => (
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

      <div>
        {filteredProducts?.length > 0 && (
          <Pagination
            totalRecorde={filteredProducts?.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  )
}

export default memo(ProductCard)