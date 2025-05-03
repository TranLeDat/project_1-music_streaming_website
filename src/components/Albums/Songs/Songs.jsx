
import clsx from "clsx";
import styles from './Songs.module.scss'
import {Routes, Route, Link} from 'react-router-dom'
import Disc from "../../Music/DIsc/Disc";

function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }
function Songs({song, songs}){
    

    if (!song || !song.album) {
        return null;
    }
    return(
        <>
            <Link to='/disc' state={{ song: song, songList: songs }} className={clsx(styles.route)}>
                <div className={clsx(styles.listSong)}>
                        <i className="fa-solid fa-music"></i>
                        <img src={song.album.cover_medium} alt={song.title} className={clsx(styles.image)} />
                        <div className={clsx(styles.info)}>
                            <h3 className={clsx(styles.title)}>{song.title}</h3>
                            <p className={clsx(styles.artist)}>{song.artist?.name}</p>
                        </div>
                        <p className={clsx(styles.time)}>{formatTime(song.duration)}</p>                  
                    </div> 
                <div className={clsx(styles.hr)}></div>       
            </Link>     
        </>
    )
}


export default Songs;