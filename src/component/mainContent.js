import React from 'react';
import styles from '../styles/home.module.css';
import { useProductContext } from '../productContext';
import ItemCard from './itemCard'; // Corrected typo in the component name

export default function MainContent(props) {
  const { search, price, category, applyFilter } = props;
  const { data } = useProductContext();

  return (
    <>
      <div className={styles.itemContainer}>
        {data
          .filter((item) => {
            return search.toLowerCase() === ''
              ? true
              : item.name.toLowerCase().includes(search.toLowerCase());
          })
          .filter((item) => {
            return !applyFilter || item.price <= price; // Improved logic
          })
          .filter((item) => {
            return !applyFilter || category === 'none' || item.category === category; // Improved logic
          })
          .map((item) => (
            <ItemCard key={item.id} item={item} /> // Corrected typo in component usage
          ))}
      </div>
    </>
  );
}
