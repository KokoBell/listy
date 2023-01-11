import { useState } from 'react'
import signInProps from '../interfaces/signInProps'
import styles from '../styles/List.module.css'
import supabase from '../supabase'

const SignIn = ({ setUser }: signInProps) => {
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
                setUserEmail('')
                setUserPassword('')
                setRegisterBtn('Check your email inbox')
                setUser(data.user)
                console.log(data)
            } catch (error: any) {
                console.error(error.message)
                setRegisterBtn('Registration failed')
                setUserEmail('')
                setUserPassword('')
            }
        }
    }

    const handleLogin = async () => {
        if (navigator.onLine) {
            try {
                setLoginBtn('Submitting...')
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: userEmail,
                    password: userPassword,
                })
                if (error) throw error
                setLoginBtn('Logged In!')
                setUser(data.user)
                setUserEmail('')
                setUserPassword('')
                window.location.reload()
            } catch (error: any) {
                setUserEmail('')
                setUserPassword('')
                setLoginBtn('Login failed')
                console.error(error.message)
            }
        }
    }

    return (
        <div className={styles.signin_container}>
            <h1>Welcome to Listii</h1>
            {login && <form className={styles.form}>
                <p className={styles.form_intro}>Login to your account</p>
                <div className={styles.form_input}>
                    <label htmlFor='email' style={{ 'display': 'none' }} >Email</label>
                    <input className={`${styles.text_input} ${styles.email_input}`} name='email' type="text" value={userEmail} placeholder="Your email address" onFocus={() => { setLoginBtn('Login') }} onChange={(event) => { setUserEmail(event.target.value) }} />
                </div>
                <div className={styles.form_input}>
                    <label htmlFor='password' style={{ 'display': 'none' }}>Password</label>
                    <input className={`${styles.text_input} ${styles.pass_input}`} name='password' type="password" value={userPassword} placeholder="Your password" onChange={(event) => { setUserPassword(event.target.value) }} />
                </div>
                <div className={styles.form_button} onClick={() => { handleLogin() }}>{loginBtn}</div>
                <p className={styles.form_bottom}>Don&apos;t have an account? <span className={styles.change_form} onClick={() => {
                    setRegisterBtn('Register')
                    setLogin(false)
                }}>Register here.</span></p>
            </form>}

            {!login && <form className={styles.form}>
                <p className={styles.form_intro}>Create an account</p>
                <div className={styles.form_input}>
                    <label htmlFor='email' style={{ 'display': 'none' }} >Email</label>
                    <input className={`${styles.text_input} ${styles.email_input}`} name='email' type="text" placeholder="Your email address" value={userEmail} onFocus={() => { setRegisterBtn('Register') }} onChange={(event) => { setUserEmail(event.target.value) }} />
                </div>
                <div className={styles.form_input}>
                    <label htmlFor='password' style={{ 'display': 'none' }}>Password</label>
                    <input className={`${styles.text_input} ${styles.pass_input}`} name='password' type="password" placeholder="Your password" value={userPassword} onChange={(event) => { setUserPassword(event.target.value) }} />
                </div>
                <div className={styles.form_button} onClick={() => { handleSignUp() }}>{registerBtn}</div>
                <p className={styles.form_bottom}>Already have an account? <span className={styles.change_form} onClick={() => {
                    setLogin(true)
                    setLoginBtn('Login')
                }}>Login here.</span></p>
            </form>}
        </div>
    )
}

export default SignIn