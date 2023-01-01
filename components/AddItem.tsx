import { useState } from 'react'
import inputProps from '../interfaces/inputProps'
import itemProps from '../interfaces/itemProps'
import styles from '../styles/List.module.css'
import supabase from '../supabase'

const AddItemModal = ({ open, setOpen, setDisplayList }: inputProps) => {
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

    const addToStorage = (data: itemProps | any[]) => {
        let store = JSON.parse(window.localStorage.getItem('mylist')!)
        store.push(data)
        setDisplayList(store)
        window.localStorage.setItem('mylist', JSON.stringify(store))   
    }

    async function addItem({ name, price, quantity, store_name }: itemProps) {
        const itemData = { 'name': name, 'price': price, 'checked': false, 'quantity': quantity, 'store_name': store_name, 'units': '1', 'notes': '' }
        try {
            const { error } = await supabase.from('items').insert(itemData).single()
            if (error) throw error
            console.log("Product added!")
        } catch (error: any) {
            console.error(error.message)
        }

        if (navigator.onLine) {
            try {
                const { data, error } = await supabase.from('items').select().eq('name', name)
                if (error) throw error
                addToStorage(data[0])
                console.log("Product added to storage and database!")
            } catch (error: any) {
                console.error(error.message)
            }
        } else {
            addToStorage(itemData)
            console.log("Product added to storage!")
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
                    addItem({ name, price, quantity, 'store_name': storeName })
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

export default AddItemModal