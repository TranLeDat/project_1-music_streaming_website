import styles from './Library.module.scss'
import clsx from 'clsx';
import Header from '../../components/MainContent/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import PlayBox from '../../components/PlayBox/PlayBox';
import NotLogin from '../../components/NotLogin/NotLogin';
function Library(){
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
                            <NotLogin/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Library;