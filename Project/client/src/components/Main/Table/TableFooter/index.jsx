import React, { useEffect } from "react";

import styles from "./TableFooter.module.css";

const TableFooter = ({setPage, page, slice}) => {
  
    useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [page, setPage, slice]);

  return (
    <div className={styles.tableFooter}>
        <button
            className={`${styles.button} ${
                styles.inactiveButton
            }`}
            onClick={() => setPage(1)}
        >
            {"1"}
        </button>
        <button
            className={`${styles.button} ${
                styles.inactiveButton
            }`}
            onClick={() => setPage(page - 1)}
        >
            {"<"}
        </button>
        <button
            key={page}
            className={`${styles.pageIndicator} ${
                styles.activeButton
            }`}
        >
            {page}
        </button>
        <button
            className={`${styles.button} ${
                styles.inactiveButton
            }`}
            onClick={() => setPage(page + 1)}
        >
            {">"}
        </button>
        <button
            className={`${styles.button} ${
                styles.inactiveButton
            }`}
            onClick={() => setPage((parseInt((page / 50) +  1) * 50))}
        >
            {(parseInt((page / 50) +  1) * 50)}
        </button>
    </div>
  );
};

export default TableFooter;