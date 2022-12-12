import { useState } from "react"
import inputProps from "../interfaces/inputProps"
import itemProps from "../interfaces/itemProps"
import supabase from "../supabase"
import AddItemModal from "./AddItem"
import styles from '../styles/List.module.css'

const Item = ({ item, key }: inputProps) => {
    const [c, setC] = useState<boolean>(item.checked!)
    const [editing, setEditing] = useState<boolean>(false)
  
    const deleteItem = async (event: any) => {
      event.preventDefault()
      try {
        const { error } = await supabase.from('items').delete().eq('id', item.id)
        if (error) throw error
        console.log("Product deleted!")
        window.location.reload()
      } catch (error: any) {
        alert(error.message)
      }
    }
  
    const editItem = async (event: any) => {
  
    }
  
    return (<><li key={key} className={styles.list_item_container} onDrag={(event) => {
      event.currentTarget.translate = true
    }}>
      <input type="checkbox" className={styles.check_item} onChange={(event) => {
        item.checked = item.checked === true ? false : true
        let l = JSON.parse(localStorage.getItem('mylist')!)
        l.forEach((i: itemProps) => {
          if (i.name === item.name) {
            i.checked = item.checked
          }
        })
        localStorage.setItem('mylist', JSON.stringify(l))
        if (item.checked === true) {
          let section = document.getElementsByClassName('checked')[0]
          let el = event.target.parentElement!
          section.appendChild(el)
          setC(true)
        }
  
        if (item.checked === false) {
          let section = document.getElementsByClassName('unchecked')[0]
          let el = event.target.parentElement!
          section.appendChild(el)
          setC(false)
        }
      }} checked={c} />
      <div className={styles.list_item}>
        <p className={styles.name_label}>{item.name}</p>
        <div className={styles.item_details}>
          <p className={styles.price_label}><b>R</b><span className={styles.item_detail}>{item.price}</span> each</p>
          <p className={styles.quantity_label}><span className={`${styles.units_label} ${styles.item_detail}`}>{item.quantity}</span>{item.quantity! > 1 ? " units" : " unit"}</p>
          <p className={styles.quantity_label}>Total: <b>R</b><span className={`${styles.units_label} ${styles.item_detail}`}>{item.quantity! * item.price}</span></p>
        </div>
        <div className={styles.controls}>
          <button className={`${styles.button} ${styles.delete}`} onClick={(event) => {
            setEditing(true)
          }}><img src="/icons/edit.svg" alt="Edit this item"></img></button>
          <button className={`${styles.button} ${styles.delete}`} onClick={(event) => {
            deleteItem(event)
          }}><img src="/icons/delete.svg" alt="Delete this item"></img></button>
        </div>
      </div>
    </li>
      {editing && <AddItemModal open={editing} setOpen={setEditing} />}
    </>)
  }

  export default Item