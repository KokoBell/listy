import supabase from '../supabase'
import styles from '../styles/List.module.css'
import toolbarProps from '../interfaces/toolbarProps'

const Toolbar = ({ open, feedback, setOpen, setUser, setFeedback }: toolbarProps) => {
    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            setUser(null)
        } catch (error: any) {
            console.error(error.message)
        }
    }
    return <div className={styles.toolbar}>
        <button className={`${styles.tool_action} ${styles.logout_btn}`} onClick={async () => {
            await logout()
        }}>Logout</button>
        <button className={`${styles.tool_action} ${styles.new_item_btn}`} onClick={() => {
            setFeedback(false)
            setOpen(!open)
        }
        }>Add New Item</button>
        <button className={`${styles.tool_action} ${styles.feedback_btn}`} onClick={() => {
            setOpen(false)
            setFeedback(!feedback)
        }}>Feedback</button>
    </div >
}

export default Toolbar