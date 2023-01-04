import { useState } from 'react'
import styles from '../styles/List.module.css'

const SignIn = () => {
    const [login, setLogin] = useState<boolean>(true)

    return (
        <div className={styles.signin_container}>
            <h1>Welcome to Listy</h1>
            {login && <form className={styles.form}>
                <p className={styles.form_intro}>Login to your account</p>
                <div className={styles.form_input}>
                    <label htmlFor='email' style={{ 'display': 'none' }}>Email</label>
                    <input name='email' type="text" placeholder="Your email address" />
                </div>
                <div className={styles.form_input}>
                    <label htmlFor='email' style={{ 'display': 'none' }}>Email</label>
                    <input type="password" placeholder="Your password" />
                </div>
                <div className={styles.form_button}>Login</div>
                <p className={styles.form_bottom}>Don&apos;t have an account? <span className={styles.change_form} onClick={() => setLogin(false)}>Register here.</span></p>
            </form>}

            {!login && <form className={styles.form}>
                <p className={styles.form_intro}>Create an account</p>
                <div className={styles.form_input}>
                    <input type="text" placeholder="Your email address" />
                </div>
                <div className={styles.form_input}>
                    <input type="password" placeholder="Your password" />
                </div>
                <div className={styles.form_button}>Register</div>
                <p className={styles.form_bottom}>Already have an account? <span className={styles.change_form} onClick={() => setLogin(true)}>Login here.</span></p>
            </form>}
        </div>
    )
}

export default SignIn