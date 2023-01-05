import styles from '../styles/List.module.css'
import Image from 'next/image'

const Menu = () => {
    let iconSize = 32
    return <button className={styles.action}><Image src="/icons/menu.svg" height={iconSize} width={iconSize} alt="" /></button>
}

export default Menu