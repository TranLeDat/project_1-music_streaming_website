
import clsx from "clsx";
import styles from './Album.module.scss'
import { Link } from 'react-router-dom'


function Album({library}){
    return(
        <>
            <div className={clsx(styles.album)}>
                <Link to={`/library/pop?id=${library.id}`} className={styles.link}>
                    <img src={library.picture_big} alt={library.title} className={clsx(styles.image)} />
                    <h3 className={clsx(styles.title)} >{library.title}</h3>
                    <p className={clsx(styles.note)}>Tổng số bài hát: {library.nb_tracks} </p>
                </Link>
            </div>
        </>
    )
}

export default Album;
