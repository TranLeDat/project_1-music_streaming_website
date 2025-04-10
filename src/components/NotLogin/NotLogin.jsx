import clsx from "clsx";
import styles from './NotLogin.module.scss'


function NotLogin(){
    return(
        <>
            <div className={clsx(styles.frame)}>
                <h1 className={clsx(styles.title)}>Đăng nhập vào WOZZ để có thể sử dụng tính năng này </h1>
                <button className={clsx(styles.btn)} >Đăng nhập với ngay</button>
            </div>
        </>
    )
}

export default NotLogin;