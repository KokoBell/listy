import { useState } from 'react'
import styles from '../styles/List.module.css'
import supabase from '../supabase'

const SignIn = () => {
    const [login, setLogin] = useState<boolean>(true)
    const [userEmail, setUserEmail] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')
    const [registerBtn, setRegisterBtn] = useState<string>('Register')
    const [loginBtn, setLoginBtn] = useState<string>('Login')


    const handleSignUp = async () => {
        if (navigator.onLine) {
            try {
                setRegisterBtn('Submitting...')
                const { data, error } = await supabase.auth.signUp({
                    email: userEmail,
                    password: userPassword,
                })
                if (error) throw error
                setRegisterBtn('Verify your email!')
                console.log('Check your email for verification')
            } catch (error: any) {
                console.error(error.message)
            }
        }
    }

    return (
        <div className={styles.signin_container}>
            <h1>Welcome to Listy</h1>
            {login && <form className={styles.form}>
                <p className={styles.form_intro}>Login to your account</p>
                <div className={styles.form_input}>
                    <label htmlFor='email' style={{ 'display': 'none' }} >Email</label>
                    <input name='email' type="text" placeholder="Your email address" onChange={(event) => { setUserEmail(event.target.value) }} />
                </div>
                <div className={styles.form_input}>
                    <label htmlFor='password' style={{ 'display': 'none' }}>Password</label>
                    <input name='password' type="password" placeholder="Your password" onChange={(event) => { setUserPassword(event.target.value) }} />
                </div>
                <div className={styles.form_button}>{loginBtn}</div>
                <p className={styles.form_bottom}>Don&apos;t have an account? <span className={styles.change_form} onClick={() => setLogin(false)}>Register here.</span></p>
            </form>}

            {!login && <form className={styles.form}>
                <p className={styles.form_intro}>Create an account</p>
                <div className={styles.form_input}>
                    <label htmlFor='email' style={{ 'display': 'none' }} >Email</label>
                    <input name='email' type="text" placeholder="Your email address" onChange={(event) => { setUserEmail(event.target.value) }} />
                </div>
                <div className={styles.form_input}>
                    <label htmlFor='password' style={{ 'display': 'none' }}>Password</label>
                    <input name='password' type="password" placeholder="Your password" onChange={(event) => { setUserPassword(event.target.value) }} />
                </div>
                <div className={styles.form_button} onClick={() => { handleSignUp() }}>{registerBtn}</div>
                <p className={styles.form_bottom}>Already have an account? <span className={styles.change_form} onClick={() => setLogin(true)}>Login here.</span></p>
            </form>}
        </div>
    )
}

export default SignIn