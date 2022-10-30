import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import styles from '../../styles/List.module.css'

let list: itemProps[] = []

interface openProps {
    open: boolean,
    setOpen: Function
}

interface itemProps {
    name: string,
    price: number,
    checked: boolean
}

interface detailsProps {
    title: string,
    type: string
}

function addItem({ name, price }: itemProps) {
    if (name == "") {
        name = "Apples"
        price = 20
    }
    list.push({ 'name': name, 'price': price, 'checked': false })
}

const AddItemModal = ({ open, setOpen }: openProps) => {
    let [name, setName] = useState<string>('')
    let [price, setPrice] = useState<number>(0)
    let [quantity, setQuantity] = useState<number>(1)
    let [units, setUnits] = useState<string>('None')
    let [store, showStore] = useState<boolean>(false)
    return (<>
        <div onClick={() => setOpen(!open)} className={styles.modal_container}>
        </div>
        <div className={styles.item_container}>
            <h1 className={styles.item_heading}>Item Details</h1>
            <div className={styles.name_input}>
                <p className={styles.input_label}>Name</p>
                <input className={styles.item_name} type="text" onChange={(event) => { setName(event.target.value) }} />
            </div>
            <div className={styles.price_input}>
                <p className={styles.input_label}>Price</p>
                <input className={styles.item_price} type="text" onChange={(event) => { setPrice(parseInt(event.target.value)) }} />
            </div>
            <div className={styles.quantity_section}>
                <div className={styles.quantity_input}>
                    <p className={styles.input_label}>Quantity</p>
                    <input className={styles.item_quantity} type="text" onChange={(event) => { setQuantity(parseInt(event.target.value)) }} />
                </div>
                <div className={styles.units_input}>
                    <p className={styles.input_label}>Units</p>
                    <input className={styles.item_units} type="text" onChange={(event) => { setUnits(event.target.value) }} />
                </div>
            </div>
            <div className={styles.store_section}>
                <div className={styles.store_toggle}>
                    <p className={styles.input_label}>Show Store</p>
                    <label className={styles.store_switch}>
                        <input className={styles.store} type="checkbox" onChange={(event) => { showStore(!store) }} />
                        <span className={styles.store_slider}></span>
                    </label>
                </div>
                {store && <div className={styles.store_input}>
                    <p className={styles.input_label}>Store Name</p>
                    <input className={styles.store_name} type="text" onChange={(event) => { setUnits(event.target.value) }} />
                </div>}

            </div>
            <button className={styles.add_item} onClick={() => {
                let checked = false
                addItem({ name, price, checked })
                setOpen(false)
                setName('')
                setPrice(0)
                setQuantity(1)
                setUnits('None')
            }}>Add Item</button>
        </div>
    </>
    )
}

const SearchBar = () => {
    return <input className={styles.search} type="text" placeholder="Search..." />
}

const Details = ({ title, type }: detailsProps) => {
    let total = 0
    if (list.length > 0) {
        list.forEach((item) => {
            total = total + item.price
        })
    }

    let checked = 0
    if (list.length > 0) {
        list.forEach((item) => {
            if (item.checked == true) {
                checked = checked + item.price
            }
        })
    }

    return (<div className={styles.details}>
        <h3 className={styles.details_title}>{title}</h3>
        {type === "total" && <p className={styles.total}>&nbsp;<span style={{ 'color': 'white', 'fontWeight': 500, 'fontSize': '1.1rem' }}>R</span>{total}</p>}
        {type === "checked" && <p className={styles.checked}>&nbsp;<span style={{ 'color': 'white', 'fontWeight': 500, 'fontSize': '1.1rem' }}>R</span>{checked}</p>}
    </div>)
}

const Toolbar = ({ open, setOpen }: openProps) => {
    return <div className={styles.toolbar}>
        <div className={styles.tool_action}>Home</div>
        <div className={styles.tool_action} onClick={() => setOpen(!open)}>Add</div>
        <div className={styles.tool_action}>Profile</div>
    </div>
}

const Menu = () => {
    let iconSize = 32
    return <button className={styles.action}><Image src="/icons/menu.svg" height={iconSize} width={iconSize} alt="" /></button>
}

const Back = () => {
    let iconSize = 32
    return <Link href="/" className={styles.action}><Image src="/icons/left.svg" height={iconSize} width={iconSize} alt="" /></Link>
}

export default function Mylist() {
    let [open, setOpen] = useState<boolean>(false)
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
                        <p>{list.length} &nbsp;&nbsp;<span className={styles.items}>items</span></p>
                    </div>
                    <div className={styles.details_section}>
                        <Details title="Total:" type="total" />
                        <Details title="Checkout:" type="checked" />
                    </div>
                    <ul className={styles.list_container}>
                        {list.map((item, index) => {
                            return <li className={styles.list_item} key={index}><p style={{ 'color': 'var(--primary)', 'fontWeight': 600, 'fontSize': '1.6rem' }}>{item.name}</p><p>{item.price}</p></li>
                        })}
                    </ul>
                    <Toolbar open={open} setOpen={setOpen} />
                </div>
                {open && <AddItemModal open={open} setOpen={setOpen} />}
            </div>
        </>)
}