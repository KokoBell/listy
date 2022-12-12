import styles from '../styles/List.module.css'

const SearchBar = () => {
    return <input className={styles.search} type="search" placeholder="Search..." />
}

export default SearchBar