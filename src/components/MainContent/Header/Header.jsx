import clsx from 'clsx';
import styles from './Header.module.scss'

function Header(){
    return(
        <>
            <header id='header' className={clsx(styles.header)}>
                <div className={clsx(styles.previous)}>
                    <i class="fa-solid fa-circle-chevron-left"></i>
                </div>
                <div className={clsx(styles.searchBar)}>

                </div>
                <div className={clsx(styles.notification)}>
                    <i class="fa-solid fa-bell"></i>
                </div>
            </header>
        </>
    )
}

export default Header;