import styles from './ForYou.module.scss';
import clsx from 'clsx';
import Sidebar from '../../components/Sidebar/Sidebar';
import PlayBox from '../../components/PlayBox/PlayBox';
import Header from '../../components/MainContent/Header/Header';
import { Outlet } from 'react-router-dom';

function ForYou() {
    return (
        <>
            <div id="container" className={clsx(styles.container)}>
                <div className={clsx(styles.main_left)}>
                    <div className={clsx(styles.sidebar)}>
                        <Sidebar />
                    </div>
                    <div className={clsx(styles.playBox)}>
                        <PlayBox />
                    </div>
                </div>
                <div className={clsx(styles.main_right)}>
                    <div className={clsx(styles.header)}>
                        <Header />
                    </div>
                    <div className={clsx(styles.content)}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForYou;