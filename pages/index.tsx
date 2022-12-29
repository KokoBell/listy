import Head from "next/head"
import { useEffect, useState } from "react"
import AddItemModal from "../components/AddItem"
import Details from "../components/Details"
import EditItemModal from "../components/EditItem"
import Item from "../components/Item"
import Toolbar from "../components/Toolbar"
import itemProps from "../interfaces/itemProps"
import styles from '../styles/List.module.css'
import supabase from '../supabase'

export default function Mylist() {
  let [open, setOpen] = useState<boolean>(false)
  let [editing, setEditing] = useState<boolean>(false)
  let [displayList, setDisplayList] = useState<any[]>([])
  let [total, setTotal] = useState(0)
  let [checked, setChecked] = useState(0)
  let [itemNumber, setItemNumber] = useState<number>(0)
  let [checkedNumber, setCheckedNumber] = useState<number>(0)
  let [editItem, setEditItem] = useState<itemProps | null>(null)

  useEffect(() => {
    getItems()
  }, [])

  const updateTotals = (data: any[]) => {
    let listTotal = 0
    let listLength = 0
    let checkedTotal = 0
    let checkedLength = 0
    data.forEach((item) => {
      if (!item.checked) {
        listTotal += item.quantity * item.price
        listLength += 1
      } else {
        checkedTotal += item.quantity * item.price
        checkedLength += 1
      }
    })
    setTotal(listTotal)
    setChecked(checkedTotal)
    setItemNumber(listLength)
    setCheckedNumber(checkedLength)
  }

  async function getItems() {
    try {
      const { data, error } = await supabase.from('items').select()
      if (error) throw error
      if (data != null) {
        setDisplayList(data)
        updateTotals(data)
      }
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.main}>
          {/* <div className={styles.nav}>
            <Back />
            <SearchBar />
            <Menu />
          </div> */}
          <div className={styles.header_section}>
            <h1 className={styles.heading}>My List</h1>
            <p>{itemNumber} &nbsp;<span className={styles.items}>{checkedNumber == 1 ? "item" : "items"}</span></p>
          </div>
          <div className={styles.details_section}>
            <Details title="Total:" type="total" total={total} />
            <Details title="Checkout:" type="checked" checked={checked} />
          </div>
          <ul className={`${styles.list_container} unchecked`}>
            {displayList.filter((item) => item.checked === false).map((item, index) => {
              return <Item item={item} index={index} setEditing={setEditing} setEditItem={setEditItem} />
            })}
          </ul>
          <div className={styles.checked_section} style={{ 'color': '#999'/* , 'opacity': `${checkedNumber > 0 ? '1' : '0'}` /* For removing the header when the list is empty *\  */ }}>
            <h1 className={styles.heading}>Checked Items</h1>
            <p>{checkedNumber} &nbsp;<span className={styles.items}>{checkedNumber == 1 ? "item" : "items"}</span></p>
          </div>
          <ul className={`${styles.list_container} checked`}>
            {displayList.filter((item) => item.checked === true).map((item, index) => {
              return <Item item={item} index={index} setEditing={setEditing} setEditItem={setEditItem} />
            })}
          </ul>
          <Toolbar open={open} setOpen={setOpen} />
        </div>
        {open && <AddItemModal open={open} setOpen={setOpen} />}
        {editing && <EditItemModal editing={editing} setEditing={setEditing} item={editItem!} />}
      </div>
    </>)
}