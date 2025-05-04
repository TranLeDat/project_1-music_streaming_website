
import styles from './Song.module.scss'
import clsx from 'clsx';
import {Link} from 'react-router-dom'

function Song({item, items, source}){

    return(
        <>
            <div className={clsx(styles.frame)}>
                
                <Link to='/disc' state={{ song: item, songList: items, source:{source} }} key={item.id} className={clsx(styles.route)}>
                     <div key={item.id} className={clsx(styles.songItems)}>
                        <div className={clsx(styles.songItem)}>
                               <i className="fa-solid fa-music"></i>
                            <img src={item.img} alt={item.title} className={clsx(styles.image)} />
                            <div className={clsx(styles.info)}>
                                <h3 className={clsx(styles.title)}>{item.title}</h3>
                                <p className={clsx(styles.artist)}>{item.artist?.name || item.artist}</p>
                            </div>
                            <p className={clsx(styles.time)}>{item.time}</p>
                            </div>
                        <div className={clsx(styles.hr)}></div>
                    </div>
                </Link>
            </div>
        </>
    )
}


export default Song;
