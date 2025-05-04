
import clsx from "clsx";
import styles from './ClientLogin.module.scss'
import background from '../../assets/img/user/Rectangle 87.png'
import { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom'
import Song from "../../components/Song/Song";
import musicApi from "../../api/musicApi";

function UserLogin(){


    const source = 'account'; 
    const location = useLocation();
    const artistId = location.state?.artistId;
    const [artist, setArtist] = useState(null);
    const [tracks, setTracks] = useState([]);

    const [visibleCount, setVisibleCount] = useState(10); 

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (artistId) {
            const resArtist = await musicApi.getArtist(artistId);
            console.log('artist', resArtist);
            setArtist(resArtist);
    
            const resTracks = await musicApi.getTopTracksByArtist(artistId); 
            console.log('resTracks', resTracks);
            setTracks(resTracks);
            setVisibleCount(10);
          }
        } catch (error) {
          console.error('Error loading artist data:', error);
        }
      };
      fetchData();
    }, [artistId]);

    const allSongs = tracks || [];
    const visibleSongs = allSongs.slice(0, visibleCount);
    const canLoadMove = visibleCount < allSongs.length;



    return(
        <>
            <div className={clsx(styles.frameWrapper)}>
                <div className={clsx(styles.bg)}>
                    <img src={background} alt="background" className={clsx(styles.imgBg)} />
                </div>
                <div className={clsx(styles.infos)}>
                    <img src={artist?.picture_medium} alt={artist?.name} className={clsx(styles.avatar)} />
                    <div className={clsx(styles.content)}>
                        <h3 className={clsx(styles.userName)}>{artist?.name}</h3>
                        <ul className={clsx(styles.info)}>
                            <li className={clsx(styles.desc)}>Số bài hát đăng tải: {artist?.nb_album}</li>
                            <li className={clsx(styles.circle)}></li>
                            <li className={clsx(styles.desc)}>{artist?.nb_fan} người theo dõi</li>
                        </ul>

                    </div>
                </div>
            </div>
            <div className={clsx(styles.post)}>
                <h2 className={clsx(styles.sectionTitle)}>Các bài hát đã đăng tải</h2>
                {visibleSongs.map((item) =>(
                    <Song key={item.id} item={item} items={tracks}  source={source} />
                ))}
                {canLoadMove &&(
                    <div className={clsx(styles.loadMoreWrapper)}>
                        <button
                            className={clsx(styles.loadMoreBtn)}
                            onClick={() => setVisibleCount((prev) => prev + 10)}
                        >
                            Xem thêm
                        </button>
                    </div>                    
                )}


                

            </div>
        </>
    )
}

export default UserLogin;