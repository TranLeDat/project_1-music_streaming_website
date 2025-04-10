
import styles from './FavoriteLogged.module.scss'
import clsx from 'clsx';


function FavoriteLogged({listLiked, favoriteList}){
    const renderSongList = (items)=>{
        return items.map((item) =>(
            <div key={item.id} className={clsx(styles.songItems)}>
                <div className={clsx(styles.songItem)}>
                    <i className="fa-solid fa-music"></i>
                    <img src={item.img} alt={item.title} className={clsx(styles.image)} />
                    <div className={clsx(styles.info)}>
                        <h3 className={clsx(styles.title)}>{item.title}</h3>
                        <p className={clsx(styles.artist)}>{item.artist}</p>
                    </div>
                    <p className={clsx(styles.time)}>{item.time}</p>
                </div>
                <div className={clsx(styles.hr)}></div>
            </div>
        ));
    };

    return(
        <>
            <div className={clsx(styles.frame)}>
                <div className={clsx(styles.liked)}>
                    <h2 className={clsx(styles.sectionTitle)}>Đã thích gần đây</h2>
                    {renderSongList(listLiked)}
                </div>
                <div className={clsx(styles.favorite)}>
                    <h2 className={clsx(styles.sectionTitle)}>Danh sách yêu thích</h2>
                    {renderSongList(favoriteList)}
                </div>
            </div>
        </>
    )
}


export default FavoriteLogged;
