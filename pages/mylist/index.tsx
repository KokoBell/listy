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
    name: string
}

function addItem({ name }: itemProps) {
    list.push({ 'name': name })
}

const AddItemModal = ({ open, setOpen }: openProps) => {
    let [name, setName] = useState<string>('')
    return (<>
        <div onClick={() => setOpen(!open)} className={styles.modal_container}>
        </div>
        <div className={styles.item_container}>
            <input className={styles.item_name} type="text" onChange={(event) => { setName(event.target.value) }} />
            <button className={styles.add_item} onClick={() => {
                addItem({ name })
                setOpen(false)
            }}>Add Item</button>
        </div>
    </>
    )
}

const SearchBar = () => {
    return <input className={styles.search} type="text" placeholder="Search..." />
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
                <div className={styles.heading}>My List</div>
                {list.map((item, index) => {
                    return <li key={index}>{item.name}</li>
                })}
                <Toolbar open={open} setOpen={setOpen} />
            </div>
            {open && <AddItemModal open={open} setOpen={setOpen} />}
        </div>)
}