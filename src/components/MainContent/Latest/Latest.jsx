import styles from './Latest.module.scss'
import clsx from 'clsx';

function Latest({latest}){
    return(
        <>
            <div className={clsx(styles.item)}>
                <div className={clsx(styles.coverWrapper)}>   
                    <img src={latest.image} alt='Song cover' className={clsx(styles.cover)} />
                </div>
                <h3 className={clsx(styles.title)}>{latest.songTitle}</h3>
                <p className={clsx(styles.artist)}>{latest.artist}</p>
            </div>
        </>
    )
}

export default Latest;