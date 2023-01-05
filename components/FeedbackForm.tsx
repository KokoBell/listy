import { useState } from 'react'
import feedbackProps from '../interfaces/feedbackProps'
import styles from '../styles/List.module.css'

const FeedbackForm = ({ feedback, setFeedback, user }: feedbackProps) => {
    let [likes, setLikes] = useState<string>('')
    let [dislikes, setDislikes] = useState<string>('')

    return (<>
        <div onClick={() => setFeedback(!feedback)} className={styles.edit_modal_container}>
        </div>
        <form className={styles.edit_container}>
            <h1 className={styles.item_heading}>Tell us what you think!</h1>
            <div className={styles.invisible_input}>
                <p className={styles.input_label}>User Email</p>
                <input id="email" name="email" type="email" defaultValue={user.email} />
            </div>
            <div className={styles.name_input}>
                <p className={styles.feedback_label}>What did you like about the app?</p>
                <textarea className={styles.feedback_input} onChange={(event) => { setLikes(event.target.value) }} />
            </div>
            <div className={styles.price_input}>
                <p className={styles.feedback_label}>What did you dislike about the app?</p>
                <textarea className={styles.feedback_input} onChange={(event) => { setDislikes(event.target.value) }} />
            </div>
            <button id="edit_item" type="submit" className={styles.submit_feedback} onClick={() => {

            }}>Submit Feedback</button>
        </form>
    </>
    )
}

export default FeedbackForm