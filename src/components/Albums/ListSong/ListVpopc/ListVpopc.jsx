
import clsx from "clsx";
import styles from './ListVpopc.module.scss'
import ListAlbum from "../../ListAlbum/ListAlbum";
import Songs from "../../Songs/Songs";
import { vpops } from "../../../../songs";
import { albums } from "../../../../data";

function ListVpopc(){
    const album = albums[3];
    return (
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

 export default ListVpopc;