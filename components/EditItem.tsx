import { useEffect, useState } from 'react'
import editProps from '../interfaces/editProps'
import itemProps from '../interfaces/itemProps'
import styles from '../styles/List.module.css'
import supabase from '../supabase'

const EditItemModal = ({ editing, setEditing, item, handleDisplay }: editProps) => {
    let [name, setName] = useState<string>(item.name)
    let [price, setPrice] = useState<number>(item.price)
    let [quantity, setQuantity] = useState<number>(item.quantity!)
    let [store, showStore] = useState<boolean>(false)
    let [store_name, setStoreName] = useState<string>(item.store_name!)

    useEffect(() => {
        handleStore()
        handleButton()
    }, [])

    const handleStore = () => {
        let cb = document.getElementById("store") as HTMLInputElement
        if (cb != null) {
            if (item.store_name != "") {
                showStore(true)
                cb!.checked = true
            } else {
                showStore(false)
                cb!.checked = false
            }
        }
    }

    const handleButton = () => {
        let editButton = document.getElementById('edit_item')
        if (editButton != null) {
            if (item.name != "") {
                editButton.style.background = 'var(--primary)'
            } else {
                editButton.style.background = 'gray'
            }
        }
    }

    const editInStorage = (data: any) => {
        let store = JSON.parse(window.localStorage.getItem('mylist')!)
        let itemIndex = -1
        store.forEach((storeItem: itemProps) => {
            if (item.id == storeItem.id) {
                itemIndex = store.indexOf(storeItem)
                store[itemIndex] = { id: item.id, ...data, 'notes': 'ud'}
            }
        })
        window.localStorage.setItem('mylist', JSON.stringify(store))
        handleDisplay(store)
        console.log('Item edited in storage')
    }

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

    async function editItem({ name, price, quantity, store_name }: itemProps) {
        const data = { 'name': name, 'price': price, 'checked': false, 'quantity': quantity, 'store_name': store_name, 'units': 'none', 'notes': 'none' }
        if (navigator.onLine) {
            try {
                const { error } = await supabase.from('items').update(data).eq('id', item.id)
                if (error) throw error
                editInStorage(data)
                console.log("Product updated!")
            } catch (error: any) {
                console.error(error.message)
            }
        } else {
            editInStorage(data)
        }
    }

    return (<>
        <div onClick={() => setEditing(!editing)} className={styles.edit_modal_container}>
        </div>
        <div className={styles.edit_container}>
            <h1 className={styles.item_heading}>Edit Item</h1>
            <div className={styles.name_input}>
                <p className={styles.input_label}>Name</p>
                <input className={styles.item_name} defaultValue={item.name} type="text" onChange={(event) => {
                    if (event.target.value != '') {
                        document.getElementById('edit_item')!.style.background = 'var(--primary)'
                    } else {
                        document.getElementById('edit_item')!.style.background = 'gray'
                    }
                    setName(event.target.value)
                }} />
            </div>
            <div className={styles.price_input}>
                <p className={styles.input_label}>Price</p>
                <input className={styles.item_price} defaultValue={item.price} type="text" onChange={(event) => { setPrice(parseFloat(filterNum(event.target.value))) }} />
            </div>
            <div className={styles.quantity_section}>
                <div className={styles.quantity_input}>
                    <p className={styles.input_label}>How many?</p>
                    <input className={styles.item_quantity} defaultValue={item.quantity} placeholder="e.g. 3" type="text" onChange={(event) => { setQuantity(parseFloat(filterNum(event.target.value))) }} />
                </div>
                <div className={styles.store_toggle}>
                    <p className={styles.input_label}>Show Store</p>
                    <label className={styles.store_switch}>
                        <input id="store" className={styles.store} type="checkbox" onChange={() => { showStore(!store) }} />
                        <span className={styles.store_slider}></span>
                    </label>
                </div>
            </div>
            <div className={styles.store_section}>
                {store && <div className={styles.store_input}>
                    <p className={styles.input_label}>Store Name</p>
                    <input className={styles.store_name} defaultValue={item.store_name} type="text" onChange={(event) => { setStoreName(event.target.value) }} />
                </div>}

            </div>
            <button id="edit_item" className={styles.add_item} onClick={() => {
                if (filterName(name)) {
                    editItem({ name, price, quantity, store_name })
                }
                setEditing(false)
            }}>Update Item</button>
        </div>
    </>
    )
}

export default EditItemModal