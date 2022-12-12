import Head from "next/head"
import { useEffect, useState } from "react"
import AddItemModal from "../components/AddItem"
import Back from "../components/Back"
import Details from "../components/Details"
import Item from "../components/Item"
import Menu from "../components/Menu"
import SearchBar from "../components/Search"
import Toolbar from "../components/Toolbar"
import styles from '../styles/List.module.css'
import supabase from '../supabase'

export default function Mylist() {
  let [open, setOpen] = useState<boolean>(false)
  let [display_list, setL] = useState<any[]>([])
  let [total, setTotal] = useState(0)
  let [checked, setChecked] = useState(0)
  let [itemNumber, setItemNumber] = useState<number>(0)

  useEffect(() => {
    getItems()
  }, [])

  const countTotals = (data: any[]) => {
    let listTotal = 0
    let checkedTotal = 0
    data.forEach((item) => {
      if (!item.checked) {
        listTotal += item.quantity * item.price
      } else {
        checkedTotal += item.quantity * item.price
      }
    })
    setTotal(listTotal)
    setChecked(checkedTotal)
    setItemNumber(data.length)
  }

  async function getItems() {
    try {
      const { data, error } = await supabase.from('items').select()
      if (error) throw error
      if (data != null) {
        setL(data)
        countTotals(data)
      }
    } catch (error: any) {
      alert(error.message)
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
          <div className={styles.nav}>
            <Back />
            <SearchBar />
            <Menu />
          </div>
          <div className={styles.header_section}>
            <h1 className={styles.heading}>My List</h1>
            <p>{itemNumber} &nbsp;<span className={styles.items}>items</span></p>
          </div>
          <div className={styles.details_section}>
            <Details title="Total:" type="total" total={total} />
            <Details title="Checkout:" type="checked" checked={checked} />
          </div>
          <ul className={`${styles.list_container} unchecked`}>
            {display_list.filter((item) => item.checked === false).map((item, index) => {
              return <Item item={item} key={index} setItemNumber={setItemNumber} setTotal={setTotal} />
            })}
          </ul>
          <div className={styles.checked_section} style={{ 'color': '#999' }}>
            <h1 className={styles.heading}>Checked Items</h1>
            <p>{checked} &nbsp;<span className={styles.items}>items</span></p>
          </div>
          <ul className={`${styles.list_container} checked`}>
            {display_list.filter((item) => item.checked === true).map((item, index) => {
              return <Item item={item} key={index} setItemNumber={setItemNumber} setTotal={setTotal} />
            })}
          </ul>
          <Toolbar open={open} setOpen={setOpen} />
        </div>
        {open && <AddItemModal open={open} setOpen={setOpen} />}
      </div>
    </>)
}