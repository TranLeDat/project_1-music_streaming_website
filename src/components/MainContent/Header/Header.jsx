import clsx from 'clsx';
import styles from './Header.module.scss'

function Header(){
    return(
        <>
            <header id='header' className={clsx(styles.header)}>
                <div className={clsx(styles.previous)}>
                    <i className="fa-solid fa-circle-chevron-left"></i>
                </div>
                <div className={clsx(styles.notification)}>
                    <i className="fa-solid fa-bell"></i>
                </div>
            </header>
        </>
    )
}

export default Header;