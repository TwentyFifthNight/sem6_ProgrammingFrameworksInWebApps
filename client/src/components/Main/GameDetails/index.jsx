import Heart from "react-animated-heart";
import styles from "./styles.module.css"

const GameDetails = ({details, handleLike, isClick}) => {

    let price = details.price.toString()
    if(price !== "Unavailable")
    if(price === "0")
        price = "Free"
    else{
        while(price.length < 3)
            price = '0' + price
        price = [price.slice(0,-2),'.',price.slice(-2)].join('') + '$'
    }

    let initialPrice = details.initialPrice.toString()
    if(initialPrice !== "Unavailable")
    if(initialPrice === "0")
        initialPrice = "Free"
    else{
        while(initialPrice.length < 3)
            initialPrice = '0' + initialPrice
            initialPrice = [initialPrice.slice(0,-2),'.',initialPrice.slice(-2)].join('') + '$'
    }

    return ( 
    <div className={styles.box}>
        <div className={styles.grid}>
            <div className={styles.item1}>
                <div className={styles.absolute}>
                    <img src={details.header_image} alt="Game" className={styles.image}/>
                    <div className={styles.heart}>
                        <Heart isClick={isClick} onClick={() => handleLike(details.appid, details.name)} />
                    </div>
                </div>
            </div>
            <div className={styles.item2}>
                <span>Default Price:</span>
                <span className={styles.dflex}>{initialPrice}</span>
                <span>Price:</span>
                <span className={styles.dflex}>{price}</span>
                <span>Discount:</span>
                <span className={styles.dflex}>{details.discount}%</span>
            </div>
            <div className={styles.item3}>
                <h1>{details.name}</h1>
                <p>{details.description}</p>
            </div>
        </div>
    </div>);
}
/*
<img src={details.header_image} alt="Game" style={image}/>
appid: -1,
name: "",
price: "",
initialPrice: "",
discount: "",
description: "",
header_image: ""
*/
export default GameDetails