import { useDispatch, useSelector } from "react-redux";
import styles from "../../App.module.css";
import { memo, useState } from "react";
import { CartItemType } from "../../Type/ProductInterface";
import closeIcon from "../../assets/crossIcon.svg"

const CartItems = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: CartItemType) => state.cart.cart);
  const [showCart, setShowCart] = useState(false);
   
    return (
    <>
    <button className={styles.cartButton} onClick={() => setShowCart(!showCart)}>
        Cart ({cart.length})
      </button>

      {showCart && (
        <div className={styles.cartSidebar}>
          <p onClick={() => setShowCart(false)}>
            <img src={closeIcon} alt="Do Not Cross" width="30" height="30" />
          </p>
          <h2>Cart</h2>
          {cart.map((item: any) => (
            <div key={item.id} className={styles.cartSidebarCard}>
              <p className={styles.cartSidebarTitle}>{item.title}</p>
              <div className={styles.cartSidebarPrice}>
                <p>Qty:</p>
                <p>
                  <button className={styles.plusButton} onClick={() => { dispatch({ type: "ADD_TO_CART", payload: item }) }}>+</button>
                  <span style={{ paddingLeft: "6px", paddingRight: "6px" }}>{item.quantity}</span>
                  <button className={styles.plusButton} onClick={() => dispatch({ type: "REMOVE_SINGLE_ITEM", payload: { id: item.id } })}>-</button>
                </p>
              </div>
              <p>Price: ₹{(item.quantity * item.price) / item.quantity}</p>
              <p>Total: ₹{(item.quantity * item.price).toFixed(2)}</p>
              <button className={styles.removeButton} onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}>
                Remove
              </button>
            </div>
          ))}
          <button className={styles.CheckoutButton} >Checkout</button>
        </div>
      )}
    </>
    );
  };

  export default memo(CartItems)