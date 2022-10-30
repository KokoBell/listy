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
        name = "Populating item..."
        price = 20
    }
    list.push({ 'name': name, 'price': price, 'checked': false })
}

const AddItemModal = ({ open, setOpen }: openProps) => {
    let [name, setName] = useState<string>('')
    let [price, setPrice] = useState<number>(0)
    return (<>
        <div onClick={() => setOpen(!open)} className={styles.modal_container}>
        </div>
        <div className={styles.item_container}>
            <p className={styles.item_heading}>Add Item</p>
            <div className={styles.name_input}>
                <p className={styles.input_label}>Name</p>
                <input className={styles.item_name} type="text" onChange={(event) => { setName(event.target.value) }} />
            </div>
            <div className={styles.price_input}>
                <p className={styles.input_label}>Price</p>
                <input className={styles.item_price} type="text" onChange={(event) => { setPrice(parseInt(event.target.value)) }} />
            </div>
            <button className={styles.add_item} onClick={() => {
                let checked = false
                addItem({ name, price, checked })
                setOpen(false)
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
        {type === "total" && <p className={styles.details_length}>{total}</p>}
        {type === "checked" && <p className={styles.details_length}>{checked}</p>}
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
                    <Details title="Checked:" type="checked" />
                </div>
                <ul className={styles.list_container}>
                    {list.map((item, index) => {
                        return <li className={styles.list_item} key={index}><p>{item.name}</p><p>{item.price}</p></li>
                    })}
                </ul>

                <Toolbar open={open} setOpen={setOpen} />
            </div>
            {open && <AddItemModal open={open} setOpen={setOpen} />}
        </div>)
}