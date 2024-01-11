import styles from "./styles.module.css"
import Popup from 'reactjs-popup';

function AccountDetails({user, handleDelete}) {
    return (
        <div className={styles.card}> 
            <h3>Imię:</h3>
            <h2>{user.firstName} {user.lastName}</h2> 
            <h3>Email:</h3>
            <h2>{user.email}</h2>
            <Popup
                trigger={<button className={styles.delButton}>Usuń konto</button>}
                modal
                nested
            >
                {close => (
                    <div className={styles.modal}>
                        <button className={styles.close} onClick={close}>
                            &times;
                        </button>
                        <div className={styles.header}> Usuń konto </div>
                        <div className={styles.content}>
                            Czy napewno chcesz usunąć konto?
                        </div>
                        <div className={styles.actions}>
                            <button
                                className={styles.confirm_btn}
                                onClick={handleDelete}
                            >
                                Usuń
                            </button>
                            <button
                                className={styles.cancel_btn}
                                onClick={() => {close();}}
                            >
                                Anuluj
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    );
}
export default AccountDetails