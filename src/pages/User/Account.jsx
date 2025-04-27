import clsx from "clsx";
import styles from './Account.module.scss'
import Sidebar from "../../components/Sidebar/Sidebar";
import PlayBox from "../../components/PlayBox/PlayBox";
import Header from "../../components/MainContent/Header/Header";
import Login from "../../components/Login/Login"
import UserLogin from "../UserLogin/UserLogin";
import { useAuth } from "../../components/AuthContext/AuthContext"
import { listLiked } from "../../data";
import Songs from "../../components/Albums/Songs/Songs";

function Account(){
    const {isLoggedIn} = useAuth();
    return(
        <>
            <div id="container" className={clsx(styles.container)}>
                { isLoggedIn ? 
                    <div className={clsx(styles.contentLogin)}>
                        <div className={clsx(styles.infos)}>
                            <UserLogin/>
                        </div>
                        <div className={clsx(styles.songs)}>
                            <h2 className={clsx(styles.title)}>Đã nghe gần đây</h2>
                            <div className={clsx(styles.song)}>
                                {listLiked.map((item) =>(
                                    <Songs key={item.id} pop={item}/>
                                ))}
                            </div>    
                        </div>
                    </div>
                :
                    <div className={clsx(styles.frame)}>
                        <Login/>
                    </div>
                }          
            </div>
        </>
    )
}

export default Account;