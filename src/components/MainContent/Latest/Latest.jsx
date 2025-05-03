import { Link } from 'react-router-dom';
import styles from './Latest.module.scss'
import clsx from 'clsx';

function Latest({latest, latests}){
    
    return(
        <>
            <Link to="/disc"state={{ song: latest, songList: latests }} className={clsx(styles.item)}>
                <div className={clsx(styles.coverWrapper)}>   
                    <img src={latest.album?.cover} alt={latest.title} className={clsx(styles.cover)} />
                </div>
                <h3 className={clsx(styles.title)}>{latest.title}</h3>
                <p className={clsx(styles.artist)}>{latest.artist?.name}</p>
            </Link>
        </>
    )
}

export default Latest;