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
  let user

  const handleDisplay = (data: itemProps[]) => {
    let listTotal = 0
    let listLength = 0
    let checkedTotal = 0
    let checkedLength = 0
    data.forEach((item) => {
      if (!item.checked) {
        listTotal += item.quantity! * item.price
        listLength += 1
      }
      if (item.checked) {
        checkedTotal += item.quantity! * item.price
        checkedLength += 1
      }
    })
    setDisplayList(data)
    setTotal(listTotal)
    setChecked(checkedTotal)
    setItemNumber(listLength)
    setCheckedNumber(checkedLength)
  }

  const checkUser = async () => {
    user = await supabase.auth.getUser()
    console.log(user)
  }

  useEffect(() => {
    const cacheData = (data: any[]) => {
      window.localStorage.setItem('mylist', JSON.stringify(data))
    }

    const updateFromStorage = async (list: any[]) => {
      let store = JSON.parse(window.localStorage.getItem('mylist')!)
      if (store != null) {

        store.forEach(async (storeItem: any) => {
          if (storeItem.deleted) {
            try {
              const { error } = await supabase.from('items').delete().eq('id', storeItem.id)
              if (error) throw error
            } catch (error) {
              console.error(error)
            }
          }
          // For each item that was added while offline, add to the database
          if (!storeItem.id) {
            try {
              const { error } = await supabase.from('items').insert(storeItem).single()
              if (error) throw error
              console.log("Product added from storage!")
            } catch (error: any) {
              console.error(error.message)
            }
          } else {
            // For each item that was checked while offline, check it in the database
            list.every(async (listItem) => {

              // Check if the current item exists in the list
              if (listItem.id == storeItem.id) {
                let listString = JSON.stringify(listItem)
                let storeString = JSON.stringify(storeItem)
                // Check if the item has any changes
                if (listString != storeString && storeItem.notes == 'ud') {
                  // Update items that have changes
                  const data = { 'name': storeItem.name, 'price': storeItem.price, 'checked': storeItem.checked, 'quantity': storeItem.quantity, 'store_name': storeItem.store_name, 'units': 'none', 'notes': '' }
                  try {
                    const { error } = await supabase.from('items').update(data).eq('id', storeItem.id)
                    if (error) throw error
                    console.log("Product updated from storage!", storeItem.name, storeItem.checked)
                  } catch (error: any) {
                    console.error(error.message)
                  }
                }
              }
            })
          }
          checkForUpdates()
        })
      }
      console.log('Database updated from storage')
      return store
    }

    const getStorage = () => {
      let store = JSON.parse(window.localStorage.getItem('mylist')!)
      if (store != null) {
        handleDisplay(store)
      }
    }

    const checkForUpdates = () => {
      let store = JSON.parse(window.localStorage.getItem('mylist')!)
      store.forEach((storeItem: any) => {
        if (storeItem.notes == 'ud') {
          storeItem.notes = ''
        }
      })
      window.localStorage.setItem('mylist', JSON.stringify(store))
      console.log('Removing UD tags')
      return store
    }

    const freshCache = async () => {
      try {
        console.log('Fetching fresh database data')
        const { data, error } = await supabase.from('items').select()
        if (error) throw error
        console.log('Cache the fresh data')
        handleDisplay(data)
        cacheData(data)
      } catch (error: any) {
        console.error(error.message)
      }
    }

    const getItems = async () => {
      checkUser()
      try {
        console.log('Fetching stale database data')
        const { data, error } = await supabase.from('items').select()
        if (error) throw error
        if (data != null) {
          if (window.localStorage.getItem('mylist') == null) {
            cacheData(data)
          } else {
            updateFromStorage(data)
            setTimeout(() => { freshCache() }, 1500)
          }
          return data
        }
      } catch (error: any) {
        console.error(error)
        handleDisplay([])
      }
    }

    if (navigator.onLine) {
      getItems()
    } else {
      getStorage()
    }

    // Detect when the window is online and fetch data from the database 
    window.addEventListener('online', () => {
      console.log('Became online')
      getItems()
    })

    // Detect when the window is offline and fallback to the cache
    window.addEventListener('offline', async () => {
      getStorage()
      console.log('Became offline')
    })
  }, [])

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
          <section className={`${styles.list_container} unchecked`}>
            {displayList.filter((item) => item.checked === false).map((item) => {
              return <Item key={item.name} item={item} setEditing={setEditing} setEditItem={setEditItem} handleDisplay={handleDisplay} />
            })}
          </section>
          <div className={styles.checked_section} style={{ 'color': '#999'/* , 'opacity': `${checkedNumber > 0 ? '1' : '0'}` /* For removing the header when the list is empty *\  */ }}>
            <h1 className={styles.heading}>Checked Items</h1>
            <p>{checkedNumber} &nbsp;<span className={styles.items}>{checkedNumber == 1 ? "item" : "items"}</span></p>
          </div>
          <section className={`${styles.list_container} checked`}>
            {displayList.filter((item) => item.checked === true).map((item) => {
              return <Item key={item.name} item={item} setEditing={setEditing} setEditItem={setEditItem} handleDisplay={handleDisplay} />
            })}
          </section>
          <Toolbar open={open} setOpen={setOpen} />
        </div>
        {open && <AddItemModal open={open} setOpen={setOpen} handleDisplay={handleDisplay} />}
        {editing && <EditItemModal editing={editing} setEditing={setEditing} item={editItem!} handleDisplay={handleDisplay} />}
      </div>
    </>)
}