
import clsx from "clsx";
import styles from './Login.module.scss'
import google from '../../assets/img/login/chrome.png'
import facebook from '../../assets/img/login/Vector.png'
import zalo from '../../assets/img/login/zalo.png'
import apple from '../../assets/img/login/apple.png'
import { useAuth } from "../AuthContext/AuthContext";



function Login(){

    const {login} = useAuth();
    // const {logout} = useAuth();
    const handleLogin = () =>{
        alert('Đăng nhập thành công')
        login();
    }

    return(
        <>
            <div className={clsx(styles.frame)}>
                <h2 className={clsx(styles.title)}>Đăng nhập vào WOZZ</h2>
                <ul className={clsx(styles.items)}>
                    <li className={clsx(styles.item)} >
                        <button className={clsx(styles.btn, styles.btnGoogle)} onClick={handleLogin}>
                            <img src={google} alt='google' className={clsx(styles.icon)}/>
                            <p className={clsx(styles.name)}>Đăng nhập với Google</p>
                        </button>
                    </li>
                    <li className={clsx(styles.item)} >
                        <button className={clsx(styles.btn, styles.btnFacebook)} onClick={handleLogin}>
                            <img src={facebook} alt='facebook' className={clsx(styles.icon)}/>
                            <p className={clsx(styles.name)}>Đăng nhập với Facebook</p>
                        </button>
                    </li>
                    <li className={clsx(styles.item)} >
                        <button className={clsx(styles.btn, styles.btnZalo)} onClick={handleLogin}>
                            <img src={zalo} alt='zalo' className={clsx(styles.icon)}/>
                            <p className={clsx(styles.name)}>Đăng nhập với Zalo</p>
                        </button>
                    </li>
                    <li className={clsx(styles.item)} >
                        <button className={clsx(styles.btn, styles.btnApple)} onClick={handleLogin}>
                            <img src={apple} alt='apple' className={clsx(styles.icon)}/>
                            <p className={clsx(styles.name)}>Đăng nhập với Apple</p>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Login;