import clsx from 'clsx';
import styles from './Header.module.scss'
import { Navigate, useNavigate } from 'react-router-dom';


function Header(){
    const navigate = useNavigate();

    const handleBack =()=>{
        navigate(-1);
    }
    return(
        <>
            <header id='header' className={clsx(styles.header)}>
                <div className={clsx(styles.previous)} onClick={handleBack}>
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