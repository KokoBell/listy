import { useState } from 'react'
import editProps from '../interfaces/editProps'
import itemProps from '../interfaces/itemProps'
import styles from '../styles/List.module.css'
import supabase from '../supabase'

const EditItemModal = ({ editing, setEditing, item }: editProps) => {
    let [name, setName] = useState<string>(item.name)
    let [price, setPrice] = useState<number>(item.price)
    let [quantity, setQuantity] = useState<number>(item.quantity!)
    let [store, showStore] = useState<boolean>(item.storeName === '' ? true : false)
    let [storeName, setStoreName] = useState<string>(item.storeName!)

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

    async function editItem({ name, price, quantity, storeName }: itemProps) {
        const data = { 'name': name, 'price': price, 'checked': false, 'quantity': quantity, 'store_name': storeName, 'units': 'none', 'notes': 'none' }
        try {
            const { error } = await supabase.from('items').update({data}).eq('id', item.id)
            if (error) throw error
            console.log("Product updated!")
            //window.location.reload()
        } catch (error: any) {
            alert(error.message)
        }
    }

    return (<>
        <div onClick={() => setEditing(!editing)} className={styles.edit_modal_container}>
        </div>
        <div className={styles.edit_container}>
            <h1 className={styles.item_heading}>Edit Item</h1>
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
                    editItem({ name, price, quantity, storeName })
                }
            }}>Update Item</button>
        </div>
    </>
    )
}

export default EditItemModal