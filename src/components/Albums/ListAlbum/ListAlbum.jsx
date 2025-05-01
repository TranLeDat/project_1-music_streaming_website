
import clsx from 'clsx';
import styles from './ListAlbum.module.scss'



function ListAlbum({ album, popl }) {
    return (
        <div className={clsx(styles.frame)}>
            <div className={clsx(styles.image)}>
                <img src={album.picture_big} alt={album.title} className={clsx(styles.img)} />
            </div>
            <div className={clsx(styles.infos)}>
                <p className={clsx(styles.desc)}>Playlist</p>
                <h3 className={clsx(styles.title)}>{album.title}</h3>
                <p className={clsx(styles.number)}>{popl.length} bài hát</p>
                <button className={clsx(styles.btn)}>
                    <i className="fa-solid fa-circle-play"></i>
                    Phát tất cả
                </button>
            </div>
        </div>
    );
}


export default ListAlbum;