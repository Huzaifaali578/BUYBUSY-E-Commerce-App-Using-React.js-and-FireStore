import React, { useEffect, useState } from 'react';
import { useProductContext } from '../../productContext';
import Loader from '../others/loader';
import styles from '../../styles/myOrder.module.css';
import { Link } from 'react-router-dom';
import OrderDetails from './orderDetails';

export default function MyOrder() {
    const [isLoading, setIsLoading] = useState(true);
    const { myOrder } = useProductContext();

    // Simulate loading effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);
        return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }, []);

    console.log(myOrder);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <h1 className={styles.orderHeading}>My Order</h1>
                    {myOrder.length === 0 ? (
                        <>
                            <h1>You haven't placed any orders yet</h1>
                            <Link to='/'>!! Start Shopping</Link>
                        </>
                    ) : (
                        <div className={styles.orderListContainer}>
                            {myOrder.map((order, i) => (
                                <OrderDetails key={i} order={order} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
