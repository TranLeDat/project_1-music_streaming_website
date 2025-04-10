
import clsx from "clsx";
import styles from './Setting.module.scss'
import Sidebar from "../../components/Sidebar/Sidebar";
import PlayBox from "../../components/PlayBox/PlayBox";
import Header from "../../components/MainContent/Header/Header";
import Settings from "../../components/Setttings/Settings";


function Setting(){
    return(
        <>
            <div id="container" className={clsx(styles.container)}>
                <div className={clsx(styles.main_left)}>
                    <div className={clsx(styles.sidebar)}>
                        <Sidebar />
                    </div>
                    <div className={clsx(styles.playBox)}>
                        <PlayBox/>
                    </div>
                </div>
                <div className={clsx(styles.main_right)}>
                    <div className={clsx(styles.header)}>
                        <Header/>
                    </div>
                    <div className={clsx(styles.content)}>
                        <div className={clsx(styles.frame)}>
                            <Settings/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setting;