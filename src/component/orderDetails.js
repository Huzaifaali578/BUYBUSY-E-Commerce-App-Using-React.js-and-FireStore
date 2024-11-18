import React from 'react';
import styles from '../styles/myOrder.module.css';

export default function OrderDetails(props) {
    const { date, list, amount } = props.order;

    return (
        <div>
            <h1 className={styles.orderHeading}>Ordered On: {date}</h1>

            <table className={styles.orderTable}>
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((product, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{product.name}</td>
                            <td>Rs.{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>Rs.{product.quantity * product.price}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4" style={{ textAlign: 'right' }}>Grand Total</td>
                        <td>Rs.{amount}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
