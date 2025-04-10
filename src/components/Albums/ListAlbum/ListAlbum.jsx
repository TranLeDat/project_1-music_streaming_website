
import clsx from 'clsx';
import styles from './ListAlbum.module.scss'



function ListAlbum({album, popl}){
    return(
        <>
            <div className={clsx(styles.frame)}>
                <div className={clsx(styles.image)}>
                    <ul className={clsx(styles.listItem)}>
                        <li>
                            <img src={album.img1} alt="album" className={clsx(styles.img, styles.img1)} />
                        </li>
                        <li>
                            <img src={album.img2} alt="album" className={clsx(styles.img, styles.img2)} />
                        </li>
                        <li>
                            <img src={album.img3} alt="album" className={clsx(styles.img, styles.img3)} />
                        </li>
                        <li>
                            <img src={album.img4} alt="album" className={clsx(styles.img, styles.img4)} />
                        </li>
                    </ul>                
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
        </>
    )
}

export default ListAlbum;