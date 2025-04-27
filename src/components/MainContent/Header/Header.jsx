import clsx from 'clsx';
import styles from './Header.module.scss'
import { useState } from 'react';


function Header(){

    const [input, setInput] = useState('');
        const handleSearch =()=>{
            setInput('');
        }
        return(
            <>
                <header id='header' className={clsx(styles.header)}>
                    <div className={clsx(styles.previous)}>
                        <i className="fa-solid fa-circle-chevron-left"></i>
                    </div>
                    <div className={clsx(styles.searchBars)}>
                        <input type="text" className={clsx(styles.searchBar)} value={input} onChange={(e) => {setInput(e.target.value)}}  placeholder='What do you want to listen to?'/>
                        <button className={clsx(styles.btn)}
                            onClick={handleSearch}
                        >
                            <i className="fa-solid fa-magnifying-glass" ></i>
                        </button>
                    </div>
                    <div className={clsx(styles.notification)}>
                        <i className="fa-solid fa-bell"></i>
                    </div>
                </header>
            </>
        )
}

export default Header;