
import clsx from "clsx";
import styles from './ListUSUK.module.scss'
import ListAlbum from "../../ListAlbum/ListAlbum";
import Songs from "../../Songs/Songs";
import { albums } from "../../../../data";
import { usuks } from "../../../../songs";


function ListUSUK(){
    const album = albums[1]
    return(
        <>
            <div className={clsx(styles.libAlbum)}>
                <div className={clsx(styles.album)}>
                    <ListAlbum album={album} popl={usuks}/>
                </div>
                <div className={clsx(styles.songs)}>
                    {usuks.map((vpop) =>(
                        <Songs key={vpop.id} pop={vpop}/>
                    ))}
                    
                </div>
            </div>
        </>
    )
}

export default ListUSUK;
