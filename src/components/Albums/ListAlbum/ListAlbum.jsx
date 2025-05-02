
import clsx from 'clsx';
import styles from './ListAlbum.module.scss'



function ListAlbum({ playlist }) {
    
    return (
        <div className={clsx(styles.frame)}>
            <div className={clsx(styles.image)}>
                <img src={playlist.picture_big} alt={playlist.title} className={clsx(styles.img)} />
            </div>
            <div className={clsx(styles.infos)}>
                <p className={clsx(styles.desc)}>Playlist</p>
                <h3 className={clsx(styles.title)}>{playlist.title}</h3>
                <p className={clsx(styles.number)}>{playlist.nb_tracks} bài hát</p>
                <button className={clsx(styles.btn)}>
                    <i className="fa-solid fa-circle-play"></i>
                    Phát tất cả
                </button>
            </div>
        </div>
    );
}


export default ListAlbum;