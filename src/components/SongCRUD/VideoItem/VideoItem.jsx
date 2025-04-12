
import clsx from "clsx";
import styles from './VideoItem.module.scss'


function VideoItem({video}){
    return(
        <>
            <div className={clsx(styles.frame)}>
                <img src={video.thumbnail} alt="thumbnail" className={clsx(styles.thumbnail)}/>
                <div className={clsx(styles.info)}>
                    <h3 className={clsx(styles.title)}>{video.name}</h3>
                    <p className={clsx(styles.artist)}>{video.artist}</p>
                </div>
            </div>
        </>
    )
}

export default VideoItem;