
import styles from './Content.module.scss'
import clsx from "clsx";


function Content({song}) {
    
    
    return (
        <> 
            <div className={clsx(styles.songItem)}>
                <img src={song.albumArt} alt="Song cover" className={clsx(styles.cover)} />
                {/* Đặt songDetail và actions trực tiếp lên ảnh */}
                <div className={clsx(styles.songDetail)}>
                    <h3 className={clsx(styles.title)}>{song.title}</h3>
                    <h3 className={clsx(styles.artist)}>{song.artist}</h3>
                </div>
                <div className={clsx(styles.actions)}>
                    <button className={clsx(styles.actionBtn)}>
                        <i className="fa-solid fa-ellipsis-vertical"></i> {/* Thay ellipsis bằng info */}
                    </button>
                    <button className={clsx(styles.actionBtn)}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                    <button className={clsx(styles.actionBtn)}>
                        <i className="fa-regular fa-heart"></i>
                    </button>
                    <button className={clsx(styles.playBtn)} >
                        <i className="fa-solid fa-circle-play"></i>
                        <span className={clsx(styles.titlePlay)}>Play</span>
                    </button>
                </div>
            </div>                   
        </>
    );
}

export default Content;