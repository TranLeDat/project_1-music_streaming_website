import { Link } from 'react-router-dom';
import styles from './Latest.module.scss'
import clsx from 'clsx';
import queryString from 'query-string';

function Latest({latest, latests}){
    const query = queryString.stringify({songId: latest.id}) 

    return(
        <>
            <Link to={{pathname: '/disc', search: `?${query}`}} state={{ songList: latests, source: 'home' }} className={clsx(styles.item)}>
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