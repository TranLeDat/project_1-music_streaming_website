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
                <div className={clsx(styles.content)}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default ForYou;