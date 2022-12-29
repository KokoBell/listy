import { useState } from "react"
import inputProps from "../interfaces/inputProps"
import supabase from "../supabase"
import styles from '../styles/List.module.css'

const Item = ({ item, index, setEditing, setEditItem }: inputProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(item.checked!)

  const deleteItem = async (event: any) => {
    event.preventDefault()
    try {
      const { error } = await supabase.from('items').delete().eq('id', item.id)
      if (error) throw error
      console.log("Product deleted!")
      //window.location.reload()
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const checkItem = async (isChecked: boolean) => {
    try {
      const { error } = await supabase.from('items').update({ 'checked': isChecked }).eq('id', item.id)
      if (error) throw error
      console.log("Product checked!")
      //window.location.reload()
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const handleCheck = (event: any) => {
    item.checked = item.checked === true ? false : true
    checkItem(item.checked)
    if (item.checked === true) {
      let section = document.getElementsByClassName('checked')[0]
      let el = event.target.parentElement!
      section.appendChild(el)
      setIsChecked(true)
    }

    if (item.checked === false) {
      let section = document.getElementsByClassName('unchecked')[0]
      let el = event.target.parentElement!
      section.appendChild(el)
      setIsChecked(false)
    }
  }

  return (<li key={index} className={styles.list_item_container} onDrag={(event) => {
    event.currentTarget.translate = true
  }}>
    <input type="checkbox" className={styles.check_item} onChange={(event) => { handleCheck(event) }} checked={isChecked} />
    <div className={styles.list_item}>
      <p className={styles.name_label}>{item.name}</p>
      <div className={styles.item_details}>
        <p className={styles.price_label}><b>R</b><span className={styles.item_detail}>{item.price}</span> each</p>
        <p className={styles.quantity_label}><span className={`${styles.units_label} ${styles.item_detail}`}>{item.quantity}</span>{item.quantity! > 1 ? " units" : " unit"}</p>
        <p className={styles.quantity_label}>Total: <b>R</b><span className={`${styles.units_label} ${styles.item_detail}`}>{item.quantity! * item.price}</span></p>
      </div>
      <div className={styles.controls}>
        <button className={`${styles.button} ${styles.delete}`} onClick={(event) => {
          setEditItem(item)
          setEditing(true)
        }}><img src="/icons/edit.svg" alt="Edit this item"></img></button>
        <button className={`${styles.button} ${styles.delete}`} onClick={(event) => {
          deleteItem(event)
        }}><img src="/icons/delete.svg" alt="Delete this item"></img></button>
      </div>
    </div>
    {item.store_name != "" && <p className={styles.store_name_bubble}>{item.store_name}</p>}
  </li>)
}

export default Item