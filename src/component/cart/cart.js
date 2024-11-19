import React, { useEffect, useState } from "react";
import { useProductContext } from "../../productContext";
import { useAuthValue } from "../../authContext";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/cart.module.css";
import Loader from "../others/loader";
import CartItems from "./cartItems";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);

  const {
    itemInCart,
    cart,
    total,
    clearCart,
    purchaseAll,
  } = useProductContext();

  const { userLoggedIn } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, []);
    
    function handlePurchase() {
        if (itemInCart === 0) {
            toast.error("Nothing to Purchase in Your cart")
        };
        purchaseAll()
        toast.success("Your Order Has Been Placed");
        navigate('/myorder')
    }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.header}>
              <h1> Hey, {userLoggedIn.name} </h1> <small> Your Cart has </small>
            <div className={styles.cartDetails}>
              <div>
                Item: {itemInCart}
                <br />
                <button onClick={clearCart} className={styles.removeAll}>
                  Remove All
                </button>
              </div>
              <div>
                Total Amount: Rs.{total}
                <br />
                <button onClick={handlePurchase} className={styles.purchaseAll}>
                  Purchase All
                </button>
              </div>
            </div>
          </div>
          <div className={styles.itemContainer}>
            {cart.length === 0 ? (
              <h1> Nothing in Your Cart !! </h1>
            ) : (
              cart.map((product, index) => (
                <CartItems product={product} key={index} />
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}
