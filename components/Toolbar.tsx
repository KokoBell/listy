import supabase from '../supabase'
import inputProps from '../interfaces/inputProps'
import styles from '../styles/List.module.css'

const Toolbar = ({ open, setOpen }: inputProps) => {
    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut()
        } catch (error: any) {
            console.error(error.message)
        }
    }
    return <div className={styles.toolbar}>
        <button className={styles.tool_action} onClick={async () => {
            await logout()
        }}>Logout</button>
        <button className={styles.tool_action} onClick={() => setOpen(!open)}>Add</button>
        <button className={styles.tool_action}>Feedback</button>
    </div >
}

export default Toolbar