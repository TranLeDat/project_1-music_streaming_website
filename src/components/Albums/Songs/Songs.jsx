
import clsx from "clsx";
import styles from './Songs.module.scss'
import {Routes, Route, Link} from 'react-router-dom'
import Disc from "../../Music/DIsc/Disc";

function Songs({pop}){
    return(
        <>
            <Link to='/disc' className={clsx(styles.route)}>
                <div className={clsx(styles.listSong)}>
                        <i className="fa-solid fa-music"></i>
                        <img src={pop.img} alt={pop.title} className={clsx(styles.image)} />
                        <div className={clsx(styles.info)}>
                            <h3 className={clsx(styles.title)}>{pop.title}</h3>
                            <p className={clsx(styles.artist)}>{pop.artist}</p>
                        </div>
                        <p className={clsx(styles.time)}>{pop.time}</p>                  
                    </div> 
                <div className={clsx(styles.hr)}></div>       
            </Link>     
        </>
    )
}


export default Songs;