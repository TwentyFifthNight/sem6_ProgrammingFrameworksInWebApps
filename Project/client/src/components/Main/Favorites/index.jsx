import styles from "./styles.module.css"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"

function Favorites({ data , rowClick, handleOrderButton}) {

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <table className={styles.table}>
                    <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>Name</th>
                        <th className={styles.tableHeader}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((el) => (
                        <tr className={styles.tableRowItems} key={el.game}>
                            <td className={styles.tableCell} onClick={() => rowClick(el.game)}>{el.name}</td>
                            <td>
                                <FaArrowUp className={styles.order_btn} onClick={() => handleOrderButton(data.indexOf(el) - 1, data.indexOf(el))} />
                                <FaArrowDown className={styles.order_btn} onClick={() => handleOrderButton(data.indexOf(el), data.indexOf(el) + 1)}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Favorites