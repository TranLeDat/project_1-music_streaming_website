
import clsx from "clsx";
import styles from './VideoList.module.scss'
import completed from '../../../assets/img/user/check-circle.png'
import VideoItem from "../VideoItem/VideoItem";
// import { foryous } from "../../../foryou";



function VideoList({song, videos}){
    return(
        <>
            <div className={clsx(styles.songlist)}>
                <img src={completed} alt="completed" className={clsx(styles.icon)} />
                <div className={clsx(styles.video)}>
                    {videos.map((video) =>(
                        <VideoItem video={video}/>
                    ))}
                </div>
                <p className={clsx(styles.status)}>{song.status}</p>
                <p className={clsx(styles.date)}>{song.date}</p>
                <p className={clsx(styles.views)}>{song.views}</p>
                <p className={clsx(styles.comments)}>{song.comments}</p>
                <p className={clsx(styles.time)}>{song.duration}</p>
                <p className={clsx(styles.remove)}><i className="fa-solid fa-trash"></i></p>
            </div>
            <div className={clsx(styles.hr)}></div>
        </>
    )
}

export default VideoList;