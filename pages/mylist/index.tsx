import Image from "next/image"
import Link from "next/link"
import styles from '../../styles/List.module.css'

const SearchBar = () => {
    return <input className={styles.search} type="text" placeholder="Search..." />
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
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.nav}>
                    <Back />
                    <SearchBar />
                    <Menu />
                </div>
                <div className={styles.heading}>My List</div>
            </div>
        </div>)
}