import clsx from "clsx";
import styles from './NotLogin.module.scss'
import { Link } from "react-router-dom";

function NotLogin(){
    return(
        <>
            <div className={clsx(styles.frame)}>
                <h1 className={clsx(styles.title)}>Đăng nhập vào WOZZ để có thể sử dụng tính năng này </h1>
                <Link to='/account' className={clsx(styles.link)}>
                    <button  className={clsx(styles.btn)} >Đăng nhập với ngay</button>
                </Link>
            </div>
        </>
    )
}

export default NotLogin;