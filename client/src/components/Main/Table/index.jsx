import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data , page, setPage, rowClick}) => {
    const slice  = data.map( el => Object.assign({},el))
    slice.forEach( el => {
        if(el.price === '0')
            el.price = "Free"
        else{
            while(el.price.length < 3)
                el.price = '0' + el.price
            el.price = [el.price.slice(0,-2),'.',el.price.slice(-2)].join('') + '$'
        }

        if(el.initialPrice === '0')
            el.initialPrice = "Free"
        else{
            while(el.initialPrice.length < 3)
                el.initialPrice = '0' + el.initialPrice
            el.initialPrice = [el.initialPrice.slice(0,-2),'.',el.initialPrice.slice(-2)].join('') + '$'
        }
    })
    
    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <table className={styles.table}>
                    <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>Name</th>
                        <th className={styles.tableHeader}>Price</th>
                        <th className={styles.tableHeader}>Discount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {slice.map((el) => (
                        <tr className={styles.tableRowItems} key={el.appid} onClick={() => rowClick(el.appid)}>
                            <td className={styles.tableCell}>{el.name}</td>
                            <td className={styles.tableCell}> {el.price === el.initialPrice ? el.price : <><s>{el.initialPrice}</s> {el.price} </>} </td>
                            <td className={styles.tableCell}>{el.discount}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <TableFooter setPage={setPage} page={page} slice={slice}/>
            </div>
        </div>
    )
};

export default Table;