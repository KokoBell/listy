import { useState } from 'react'
import feedbackProps from '../interfaces/feedbackProps'
import styles from '../styles/List.module.css'

const FeedbackForm = ({ feedback, setFeedback, user }: feedbackProps) => {
    let [likes, setLikes] = useState<string>('')
    let [dislikes, setDislikes] = useState<string>('')

    return (<>
        <div onClick={() => setFeedback(!feedback)} className={styles.submit_modal_container}>
        </div>
        <form className={styles.form_container} id="feedback-form" target="_blank" action="https://formsubmit.co/24bc1633ce0429f2492d9f29f466a270" method="POST">
            <h1 className={styles.item_heading}>Tell us what you think!</h1>
            <div className={styles.invisible_input}>
                <p className={styles.input_label}>User Email</p>
                <input id="email" name="email" type="email" defaultValue={user.email} />
            </div>
            <div className={styles.name_input}>
                <p className={styles.feedback_label}>What did you like about the app?</p>
                <textarea form='feedback-form' name='likes' className={styles.feedback_input} value={likes} onChange={(event) => { setLikes(event.target.value) }} required />
            </div>
            <div className={styles.price_input}>
                <p className={styles.feedback_label}>What did you dislike about the app?</p>
                <textarea form='feedback-form' name='dislikes' className={styles.feedback_input} value={dislikes} onChange={(event) => { setDislikes(event.target.value) }} required />
            </div>
            <button id="edit_item" type="submit" className={styles.submit_feedback}>Submit Feedback</button>
        </form>
    </>
    )
}

export default FeedbackForm