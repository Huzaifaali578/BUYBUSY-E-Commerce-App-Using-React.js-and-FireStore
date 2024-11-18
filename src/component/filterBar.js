import React from 'react';
import styles from '../styles/home.module.css';

export default function FilterBar(props) {
  const { price, setPrice, setCategory, category } = props; // Fixed prop name (Category -> category)
  return (
    <div>
      <div className={styles.filterBar}>
        <h1>FilterBar</h1>

        <div className={styles.priceRange}>
          <span>Price</span> {`>= ${price}`}
          <input
            type="range"
            min="100"
            max="50000" // Removed quotes from max value
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))} // Ensure price is treated as a number
          />
        </div>

        <div className={styles.categoryBox}>
          <span>Category</span>
          <div>
            <input
              type="radio"
              id="Electronics"
              value="Electronics"
              name="category"
              checked={category === 'Electronics'} // Added checked for controlled input
              onChange={() => setCategory('Electronics')}
            />
            <label htmlFor="Electronics">Electronics</label> {/* Changed `for` to `htmlFor` */}

            <input
              type="radio"
              id="Fashion"
              value="Fashion"
              name="category"
              checked={category === 'Fashion'}
              onChange={() => setCategory('Fashion')}
            />
            <label htmlFor="Fashion">Fashion</label>

            <input
              type="radio"
              id="Kitchen"
              value="Kitchen"
              name="category"
              checked={category === 'Kitchen'}
              onChange={() => setCategory('Kitchen')}
            />
            <label htmlFor="Kitchen">Kitchen</label>

            <input
              type="radio"
              id="Accessories"
              value="Accessories"
              name="category"
              checked={category === 'Accessories'}
              onChange={() => setCategory('Accessories')}
            />
            <label htmlFor="Accessories">Accessories</label>

            <input
              type="radio"
              id="Furniture"
              value="Furniture"
              name="category"
              checked={category === 'Furniture'}
              onChange={() => setCategory('Furniture')}
            />
            <label htmlFor="Furniture">Furniture</label>

            <input
              type="radio"
              id="None"
              value="None"
              name="category"
              checked={category === 'None'}
              onChange={() => setCategory('None')}
            />
            <label htmlFor="None">None</label>
          </div>
        </div>
      </div>
    </div>
  );
}
