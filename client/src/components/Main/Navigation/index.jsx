import styles from "./styles.module.css"

function Navigation({getGames, favorite, description, logout, page}) {
    return (
        <nav className={styles.navbar}>
            <button className={styles.blue_btn} onClick={() => getGames(page)}>
                Games
            </button>
            <button className={styles.blue_btn} onClick={favorite}>
                Favorite
            </button>
            <button className={styles.blue_btn} onClick={description}>
                AccountDetails
            </button>
            <button className={styles.blue_btn} onClick={logout}>
                Logout
            </button>
        </nav>
    );
}
export default Navigation