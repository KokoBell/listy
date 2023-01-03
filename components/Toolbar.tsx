import supabase from '../supabase'
import inputProps from '../interfaces/inputProps'
import styles from '../styles/List.module.css'
import toolbarProps from '../interfaces/toolbarProps'

const Toolbar = ({ open, setOpen, setUser }: toolbarProps) => {
    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            setUser(null)
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