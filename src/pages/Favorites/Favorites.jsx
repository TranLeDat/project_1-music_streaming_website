import styles from './Favorites.module.scss'
import clsx from 'clsx';
import NotLogin from '../../components/NotLogin/NotLogin';
import FavoriteLogged from '../../components/Loggedin/FavoriteLogin/FavoriteLogged';
import { listLiked, favoriteList, artists } from '../../../src/data';
import { useAuth } from '../../components/AuthContext/AuthContext';
import Outstanding from '../../components/MainContent/OutStanding/Outstanding';

function Favorites(){
    const {isLoggedIn} = useAuth()
    return(
        <>
            <div className={clsx(styles.container)}>      
                {isLoggedIn ? 
                    <div className={clsx(styles.contentLogin)}>
                        <div className={clsx(styles.frameLogin)}>
                            <FavoriteLogged listLiked={listLiked} favoriteList={favoriteList} />
                        </div>
                        <div className={clsx(styles.outStandings)}>
                            <h2 className={clsx(styles.outStandingTitle)}>Ca sĩ nổi bật</h2>
                            <div className={clsx(styles.outStanding)}>
                                {artists.map((artist, index) =>(
                                <Outstanding key={index} artist={artist} />
                                ))}
                            </div>
                        </div>   
                    </div>       
                :
                    <div className={clsx(styles.notLogin)}>
                        <NotLogin/>
                    </div>
                }
            </div>
        </>
    )
}

export default Favorites;