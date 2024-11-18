import React, { useEffect, useState } from 'react';
import Loader from './loader';
import styles from '../styles/home.module.css';
import FilterBar from './filterBar';
import MainContent from './mainContent';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true); // Corrected state setter name
    const [applyFilter, setApplyFilter] = useState(false);
    const [price, setPrice] = useState(5000);
    const [category, setCategory] = useState('none');
    const [search, setSearch] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false); // Corrected state setter name
        }, 400);
    }, []);

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className={styles.header}>
                        <input
                            type="text"
                            placeholder="Search item..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button onClick={() => setApplyFilter(!applyFilter)}>
                            {applyFilter ? "Cancel" : "Apply Filter"} {/* Corrected typo in button text */}
                        </button>
                    </div>
                    <div className={styles.mainContainer}>
                        {applyFilter && (
                            <FilterBar
                                price={price}
                                setPrice={setPrice}
                                category={category}
                                setCategory={setCategory}
                            />
                        )}
                    </div>
                    <MainContent
                        price={price}
                        category={category}
                        applyFilter={applyFilter}
                        search={search}
                    />
                </>
            )}
        </div>
    );
}
