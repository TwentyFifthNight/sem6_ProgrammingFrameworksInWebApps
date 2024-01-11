import styles from "./styles.module.css"

function ErrorMessage({message}) {

    return (
        <title className={styles.error}>{message}</title>
    );
}

export default ErrorMessage