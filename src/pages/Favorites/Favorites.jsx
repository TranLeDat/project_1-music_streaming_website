import styles from './Favorites.module.scss'
import clsx from 'clsx';
import NotLogin from '../../components/NotLogin/NotLogin';
import Sidebar from '../../components/Sidebar/Sidebar';
import PlayBox from '../../components/PlayBox/PlayBox';
import Header from '../../components/MainContent/Header/Header';
import FavoriteLogged from '../../components/Loggedin/FavoriteLogin/FavoriteLogged';
import { listLiked, favoriteList } from '../../../src/data';
import { useAuth } from '../../components/AuthContext/AuthContext';

function Favorites(){
    const {isLoggedIn} = useAuth()
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
                    {isLoggedIn ? 
                        <div className={clsx(styles.contentLogin)}>
                            <div className={clsx(styles.frameLogin)}>
                                <FavoriteLogged listLiked={listLiked} favoriteList={favoriteList} />
                            </div>
                        </div>
                        
                    :
                        <div className={clsx(styles.content, styles.login)}>
                            <div className={clsx(styles.frame, styles.login)}>
                                <NotLogin/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Favorites;