
import clsx from "clsx";
import styles from './Songs.module.scss'


function Songs({pop}){
    return(
        <>
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
        </>
    )
}


export default Songs;