import ListAlbum from "../../ListAlbum/ListAlbum";
import Songs from "../../Songs/Songs";
import clsx from "clsx";
import styles from './ListVpop.module.scss'
import { vpops } from "../../../../songs";
import { albums } from "../../../../data";

function ListVpop(){
    const album = albums[0]
    
    return(
        <>
            <div className={clsx(styles.libAlbum)}>
                <div className={clsx(styles.album)}>
                    <ListAlbum album={album} popl={vpops}/>
                </div>
                <div className={clsx(styles.songs)}>
                    {vpops.map((vpop) =>(
                        <Songs key={vpop.id} pop={vpop}/>
                    ))}
                    
                </div>
            </div>
        </>
    )
}


export default ListVpop;
