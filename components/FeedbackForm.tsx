import { useEffect, useState } from 'react'
import editProps from '../interfaces/editProps'
import feedbackProps from '../interfaces/feedbackProps'
import itemProps from '../interfaces/itemProps'
import styles from '../styles/List.module.css'
import supabase from '../supabase'

const FeedbackForm = ({ feedback, setFeedback }: feedbackProps) => {
    let [notes, setNotes] = useState<string>('')
    let [price, setPrice] = useState<number>()
    let [quantity, setQuantity] = useState<number>()
    let [store, showStore] = useState<boolean>(false)
    let [store_name, setStoreName] = useState<string>()

    return (<>
        <div onClick={() => setFeedback(!feedback)} className={styles.edit_modal_container}>
        </div>
        <div className={styles.edit_container}>
            <h1 className={styles.item_heading}>Enter new details</h1>
            <p className={styles.feedback_intro}>We&apos;re always looking for ways to improve our app. If you have any suggestions or thoughts, we&apos;d love to hear them.</p>
            <div className={styles.name_input}>
                <p className={styles.input_label}>Name</p>
                <input className={styles.item_name} type="text" onChange={(event) => { }} />
            </div>
            <div className={styles.price_input}>
                <p className={styles.input_label}>Price</p>
                <input className={styles.item_price} type="text" onChange={(event) => { }} />
            </div>
            <div className={styles.quantity_section}>
                <div className={styles.quantity_input}>
                    <p className={styles.input_label}>How many?</p>
                    <input className={styles.item_quantity} placeholder="e.g. 3" type="text" onChange={(event) => { }} />
                </div>
                <div className={styles.store_toggle}>
                    <p className={styles.input_label}>Show Store</p>
                    <label className={styles.store_switch}>
                        <input id="store" className={styles.store} type="checkbox" onChange={() => { }} />
                        <span className={styles.store_slider}></span>
                    </label>
                </div>
            </div>
            <button id="edit_item" type="submit" className={styles.add_item} onClick={() => {

            }}>Submit Feedback</button>
        </div>
    </>
    )
}

export default FeedbackForm