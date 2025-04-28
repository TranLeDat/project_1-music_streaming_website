
import styles from './Content.module.scss'
import clsx from "clsx";


function Content({content}) {
    
    
    return (
        <> 
            <div className={clsx(styles.songItem)}>
                <img src={content.album?.cover_big} alt={content.title} className={clsx(styles.cover)} />
                <div className={clsx(styles.songDetail)}>
                    <h3 className={clsx(styles.title)}>{content.title}</h3>
                    <h3 className={clsx(styles.artist)}>{content.artist?.name}</h3>
                </div>
                <div className={clsx(styles.actions)}>
                    <button className={clsx(styles.actionBtn)}>
                        <i className="fa-solid fa-ellipsis-vertical"></i> 
                    </button>
                    <button className={clsx(styles.actionBtn)}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                    <button className={clsx(styles.actionBtn, styles.actionHeart)}>
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