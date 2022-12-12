import Image from "next/image"
import Link from "next/link"
import styles from '../styles/List.module.css'

const Back = () => {
    let iconSize = 32
    return <Link href="/" className={styles.action}><Image src="/icons/left.svg" height={iconSize} width={iconSize} alt="" /></Link>
  }

  export default Back