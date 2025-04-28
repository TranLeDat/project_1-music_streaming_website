import styles from './Latest.module.scss'
import clsx from 'clsx';

function Latest({latest}){
    return(
        <>
            <div className={clsx(styles.item)}>
                <div className={clsx(styles.coverWrapper)}>   
                    <img src={latest.album?.cover} alt={latest.title} className={clsx(styles.cover)} />
                </div>
                <h3 className={clsx(styles.title)}>{latest.title}</h3>
                <p className={clsx(styles.artist)}>{latest.artist?.name}</p>
            </div>
        </>
    )
}

export default Latest;