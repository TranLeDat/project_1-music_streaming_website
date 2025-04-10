
import clsx from "clsx";
import styles from './Album.module.scss'


function Album({album}){
    return(
        <>
            <div className={clsx(styles.album)}>
                <ul className={clsx(styles.listItem)}>
                    <li>
                        <img src={album.img1} alt="album" className={clsx(styles.image, styles.img1)} />
                    </li>
                    <li>
                        <img src={album.img2} alt="album" className={clsx(styles.image, styles.img2)} />
                    </li>
                    <li>
                        <img src={album.img3} alt="album" className={clsx(styles.image, styles.img3)} />
                    </li>
                    <li>
                        <img src={album.img4} alt="album" className={clsx(styles.image, styles.img4)} />
                    </li>
                </ul>
                <h3 className={clsx(styles.title)} >{album.title}</h3>
                <p className={clsx(styles.note)}>Danh sách phát</p>
            </div>
        </>
    )
}

export default Album;
