
import clsx from "clsx";
import styles from './ListJpop.module.scss'
import ListAlbum from "../../ListAlbum/ListAlbum";
import Songs from "../../Songs/Songs";
import { jpops } from "../../../../songs";
import { albums } from "../../../../data";

function ListJpop(){
    const album = albums[2]
    return(
        <>
            <div className={clsx(styles.libAlbum)}>
                <div className={clsx(styles.album)}>
                    <ListAlbum album={album} popl={jpops}/>
                </div>
                <div className={clsx(styles.songs)}>
                    {jpops.map((vpop) =>(
                        <Songs key={vpop.id} pop={vpop}/>
                    ))}
                    
                </div>
            </div>
        </>
    )
}

export default ListJpop;