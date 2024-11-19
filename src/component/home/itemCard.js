import React from 'react';
import styles from '../../styles/home.module.css';
import { useProductContext } from '../../productContext';

export default function ItamCard(props) {
    const { name, price, image, category } = props.item;
    const { addTocart } = useProductContext();
    return (
        <>
            <div className={styles.cardContainer}>

                <div className={styles.imageContainer}>
                    <img src={image} alt={category} />
                </div>

                <div className={styles.itemInfo}>

                    <div className={styles.namePrice}>
                    <div className={styles.name}>
                        {name}
                    </div>
                    <div className={styles.price}>
                        Rs. {price}
                    </div>
                    </div>
                    
                    <div className={styles.btnContainer}>
                        <button className={styles.addBtn} onClick={()=> addTocart(props.item)}> Add to cart </button>
                    </div>

                </div>

            </div>

        </>
    )
}
