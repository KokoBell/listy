import Image from "next/image"
import Link from "next/link"
import styles from '../../styles/Home.module.css'

const SearchBar = () => {
    return <input type="text" placeholder="Search..." />
}

const Menu = () => {
    let iconSize = 32
    return <button><Image src="/icons/menu.svg" height={iconSize} width={iconSize} alt="" /></button>
}

const Back = () => {
    let iconSize = 32
    return <button><Image src="/icons/left.svg" height={iconSize} width={iconSize} alt="" /></button>
}

export default function Mylist() {
    return <div className={styles.main}>
        <div className={styles.nav}>
            <Back />
            <SearchBar />
            <Menu />
        </div>
        <div>My List</div>
        <Link href="/">Home</Link>
    </div>
}