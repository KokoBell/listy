import styles from '../styles/List.module.css'
import detailsProps from '../interfaces/detailsProps'

const Details = ({ title, type, list }: detailsProps) => {
    let checked = 0
    let total = 0
    if (list.length > 0) {
        list.forEach((item) => {
            if (item.checked == true) {
                checked = checked + item.quantity * item.price
            } else {
                total = total + item.quantity * item.price
            }
        })
    }

    return (<div className={styles.details}>
        <h3 className={styles.details_title}>{title}</h3>
        {type === "total" && <p className={styles.total}>&nbsp;<span className={styles.currency}>R</span>{total}</p>}
        {type === "checked" && <p className={styles.checked}>&nbsp;<span className={styles.currency}>R</span>{checked}</p>}
    </div>)
}

export default Details