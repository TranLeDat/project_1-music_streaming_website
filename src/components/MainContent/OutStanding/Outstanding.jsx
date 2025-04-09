import styles from './Outstanding.module.scss'
import clsx from 'clsx'


function Outstanding({artist}){
    return(
        <>
            <div className={clsx(styles.outStanding)}>
                <div className={clsx(styles.wrapper)}>
                    <img src={artist.img} alt="artist" className={clsx(styles.image)}/>
                </div>
                <h3 className={clsx(styles.name)}>{artist.name}</h3>
            </div>
            
        </>
    )
}

export default Outstanding;