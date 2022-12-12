import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Details from "../components/Details"
import Menu from "../components/Menu"
import SearchBar from "../components/Search"
import detailsProps from "../interfaces/detailsProps"
import inputProps from "../interfaces/inputProps"
import itemProps from "../interfaces/itemProps"
import openProps from "../interfaces/openProps"
import styles from '../styles/List.module.css'
import supabase from '../supabase'

const AddItemModal = ({ open, setOpen }: openProps) => {
  let [name, setName] = useState<string>('')
  let [price, setPrice] = useState<number>(0)
  let [quantity, setQuantity] = useState<number>(1)
  let [store, showStore] = useState<boolean>(false)
  let [storeName, setStoreName] = useState<string>('')

  const filterNum = (str: string) => {
    const numericalChar = new Set([",", ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    str = str.split("").filter(char => numericalChar.has(char)).join("")
    if (str.startsWith('.') || str.startsWith(',')) {
      str = str.substring(1)
    }
    let regex = /^[a-zA-Z]+$/;
    if (str.match(regex)) {
      str = '0'
    }
    if (parseFloat(str) < 0) {
      str = '0'
    }
    console.log(str)
    return str
  }

  const filterName = (str: string) => {
    if (str === '') {
      return false
    } else {
      return true
    }
  }

  async function addItem({ name, price, quantity, storeName }: itemProps) {
    const data = { 'name': name, 'price': price, 'checked': false, 'quantity': quantity, 'store_name': storeName, 'units': 'none', 'notes': 'none' }
    try {
      const { error } = await supabase.from('items').insert(data).single()
      if (error) throw error
      console.log("Product added!")
      window.location.reload()
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (<>
    <div onClick={() => setOpen(!open)} className={styles.modal_container}>
    </div>
    <div className={styles.item_container}>
      <h1 className={styles.item_heading}>Item Details</h1>
      <div className={styles.name_input}>
        <p className={styles.input_label}>Name</p>
        <input className={styles.item_name} type="text" onChange={(event) => {
          if (event.target.value != '') {
            document.getElementById('add_item')!.style.background = 'var(--primary)'
          } else {
            document.getElementById('add_item')!.style.background = 'gray'
          }
          setName(event.target.value)
        }} />
      </div>
      <div className={styles.price_input}>
        <p className={styles.input_label}>Price</p>
        <input className={styles.item_price} type="text" onChange={(event) => { setPrice(parseFloat(filterNum(event.target.value))) }} />
      </div>
      <div className={styles.quantity_section}>
        <div className={styles.quantity_input}>
          <p className={styles.input_label}>How many?</p>
          <input className={styles.item_quantity} placeholder="e.g. 3" type="text" onChange={(event) => { setQuantity(parseFloat(filterNum(event.target.value))) }} />
        </div>
        <div className={styles.store_toggle}>
          <p className={styles.input_label}>Show Store</p>
          <label className={styles.store_switch}>
            <input className={styles.store} type="checkbox" onChange={() => { showStore(!store) }} />
            <span className={styles.store_slider}></span>
          </label>
        </div>
      </div>
      <div className={styles.store_section}>
        {store && <div className={styles.store_input}>
          <p className={styles.input_label}>Store Name</p>
          <input className={styles.store_name} type="text" onChange={(event) => { setStoreName(event.target.value) }} />
        </div>}

      </div>
      <button id="add_item" className={styles.add_item} onClick={() => {
        if (filterName(name)) {
          addItem({ name, price, quantity, storeName })
          setOpen(false)
          setName('')
          setPrice(0)
          setQuantity(1)
          setStoreName('')
        }
      }}>Add Item</button>
    </div>
  </>
  )
}

const Toolbar = ({ open, setOpen }: openProps) => {
  return <div className={styles.toolbar}>
    <div className={styles.tool_action}>Home</div>
    <div className={styles.tool_action} onClick={() => setOpen(!open)}>Add</div>
    <div className={styles.tool_action}>Profile</div>
  </div>
}

const Back = () => {
  let iconSize = 32
  return <Link href="/" className={styles.action}><Image src="/icons/left.svg" height={iconSize} width={iconSize} alt="" /></Link>
}

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