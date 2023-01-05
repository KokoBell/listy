import { useRef, useState } from "react"
import supabase from "../supabase"
import styles from '../styles/List.module.css'
import itemProps from "../interfaces/itemProps"
import editProps from "../interfaces/editProps"

const Item = ({ item, setEditing, setEditItem, handleDisplay }: editProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(item.checked!)
  const thisItem = useRef<HTMLDivElement>(null)

  const deleteItem = async (event: any) => {
    event.preventDefault()
    if (navigator.onLine) {
      try {
        // Remove item from database 
        const { error } = await supabase.from('items').delete().eq('id', item.id)
        if (error) throw error

        // Remove item from storage
        deleteFromStorage()
        console.log("Product deleted from database and storage!")

      } catch (error: any) {
        console.error(error.message)
      }
    } else {

      //Remove item from localStorage
      deleteFromStorage()
      console.log("Product deleted from storage!")
    }

  }

  const deleteFromStorage = () => {
    let store = JSON.parse(window.localStorage.getItem('mylist')!)
    let storeCopy = store
    if (store != null) {
      if (!navigator.onLine) {
        storeCopy.forEach((storeItem: itemProps) => {
          if (storeItem.id == item.id) {
            storeItem.deleted = true
          }
        })
        store = store.filter((storeItem: itemProps) => storeItem.id != item.id && storeItem.deleted == (false || null))
      } else {
        store = store.filter((storeItem: itemProps) => storeItem.id != item.id && storeItem.deleted == (false || null))
      }
      handleDisplay(store)
    }
    if (navigator.onLine) {
      window.localStorage.setItem('mylist', JSON.stringify(store))
    } else {
      window.localStorage.setItem('mylist', JSON.stringify(storeCopy))
    }
  }

  const checkItem = async (isChecked: boolean) => {
    try {
      const { error } = await supabase.from('items').update({ 'checked': isChecked }).eq('id', item.id)
      if (error) throw error
      console.log("Product checked!")
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const checkFromStorage = () => {
    let store = JSON.parse(window.localStorage.getItem('mylist')!)
    if (store != null) {
      store.forEach((storeItem: itemProps) => {
        if (item.id == storeItem.id) {
          storeItem.checked = item.checked
          storeItem.notes = 'ud'
        }
      })
      handleDisplay(store)
    }
    window.localStorage.setItem('mylist', JSON.stringify(store))
    console.log('Product checked in storage!', store)
  }

  const handleCheck = () => {
    item.checked = item.checked === true ? false : true
    if (item.checked === true) {
      setIsChecked(true)
    }
    if (item.checked === false) {
      setIsChecked(false)
    }
    if (navigator.onLine) {
      checkItem(item.checked)
      checkFromStorage()
    } else {
      checkFromStorage()
    }

  }

  return (<div className={styles.list_item_container} ref={thisItem}>
    <input type="checkbox" className={styles.check_item} onChange={(event) => { handleCheck() }} checked={isChecked} />
    <div className={styles.list_item}>
      <p className={styles.name_label}>{item.name}</p>
      <div className={styles.item_details}>
        <p className={styles.price_label}><b>R</b><span className={styles.item_detail}>{item.price}</span> each</p>
        <p className={styles.quantity_label}><span className={`${styles.units_label} ${styles.item_detail}`}>{item.quantity}</span>{item.quantity! > 1 ? " units" : " unit"}</p>
        <p className={styles.quantity_label}>Total: <b>R</b><span className={`${styles.units_label} ${styles.item_detail}`}>{item.quantity! * item.price}</span></p>
      </div>
      <div className={styles.controls}>
        <button className={`${styles.button} ${styles.delete}`} onClick={(event) => {
          if (setEditItem) {
            setEditItem(item)
          }
          setEditing(true)
        }}><img src="/icons/edit.svg" alt="Edit this item"></img></button>
        <button className={`${styles.button} ${styles.delete}`} onClick={(event) => {
          deleteItem(event)
        }}><img src="/icons/delete.svg" alt="Delete this item"></img></button>
      </div>
    </div>
    {item.store_name != "" && <p className={styles.store_name_bubble}>{item.store_name}</p>}
  </div>)
}

export default Item