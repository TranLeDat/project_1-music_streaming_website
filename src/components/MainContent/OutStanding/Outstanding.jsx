import styles from './Outstanding.module.scss'
import clsx from 'clsx'


function Outstanding({outStanding}){
    return(
        <>
            <div className={clsx(styles.outStanding)}>
                <div className={clsx(styles.wrapper)}>
                    <img src={outStanding.artist?.picture_small} alt={outStanding.artist.name} className={clsx(styles.image)}/>
                </div>
                <h3 className={clsx(styles.name)}>{outStanding.artist?.name}</h3>
            </div>
            
        </>
    )
}

export default Outstanding;