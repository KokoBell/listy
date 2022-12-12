import openProps from "../interfaces/openProps"
import styles from '../styles/List.module.css'

const Toolbar = ({ open, setOpen }: openProps) => {
    return <div className={styles.toolbar}>
        <div className={styles.tool_action}>Home</div>
        <div className={styles.tool_action} onClick={() => setOpen(!open)}>Add</div>
        <div className={styles.tool_action}>Profile</div>
    </div>
}

export default Toolbar