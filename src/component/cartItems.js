import React from 'react';
import { useProductContext } from '../productContext';
import styles from '../styles/home.module.css';
import { FaMinusCircle } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import extraCSS from '../styles/extra.module.css';

export default function CartItems(props) {
    const { increaseQuantity, decreaseQuantity, removeItemFromCart } = useProductContext();
    const { name, price, quantity, category, image } = props.product;

    return (
        <div className={styles.cardContainer}>
            <div className={styles.imageContainer}>
                <img src={image} alt={category} />
            </div>
            <div className={styles.itemInfo}>
                <div className={styles.namePrice}>
                    {name}
                </div>
                <div className={styles.priceQuant}>
                    Rs.{price}
                </div>
                <div className={extraCSS.quantity}>
                    <span className={extraCSS.minus}>
                        <FaMinusCircle onClick={() => decreaseQuantity(props.product)} />
                    </span>
                    {` ${quantity} `}
                    <span className={extraCSS.plus}>
                        <FaPlusSquare onClick={() => increaseQuantity(props.product)} />
                    </span>
                </div>
            </div>

            <div className={styles.btnContainer}>
                <button onClick={() => removeItemFromCart(props.product)} style={{ background: "linear-gradient(to right, #ff6f61, #e63946)" }}>
                    Remove from cart
                </button>
            </div>
        </div>
    );
}
