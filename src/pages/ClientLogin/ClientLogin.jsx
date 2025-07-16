import clsx from "clsx";
import styles from './ClientLogin.module.scss';
import background from '../../assets/img/user/Rectangle 87.png';
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Song from "../../components/Song/Song";
import musicApi from "../../api/musicApi";

function ClientLogin() {
    const source = 'client'; 
    const location = useLocation();
    const artistId = location.state?.artistId;

    const [artist, setArtist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        const fetchInitial = async () => {
        if (!artistId) return;

        const resArtist = await musicApi.getArtist(artistId);
        setArtist(resArtist);

        const resTracks = await musicApi.getTopTracksByArtist(artistId, limit, 0);
        setTracks(resTracks);
        setCurrentPage(1);
        setHasMore(resTracks.length === limit);
        };
        fetchInitial();
    }, [artistId]);

    const handleLoadMore = async () => {
        const nextIndex = currentPage * limit;
        const moreTracks = await musicApi.getTopTracksByArtist(artistId, limit, nextIndex);
        setTracks((prev) => [...prev, ...moreTracks]);
        setCurrentPage((prev) => prev + 1);
        setHasMore(moreTracks.length === limit);
    };

    return (
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
                        <li className={clsx(styles.desc)}>{artist?.nb_fan?.toLocaleString()} người theo dõi</li>
                    </ul>
                </div>
                </div>
            </div>

            <div className={clsx(styles.post)}>
                <h2 className={clsx(styles.sectionTitle)}>Các bài hát đã đăng tải</h2>
                {tracks.map((item) => (
                    <Song key={item.id} item={item} items={tracks} source={source} />
                ))}

                {hasMore && (
                <div className={clsx(styles.loadMoreWrapper)}>
                    <button
                        className={clsx(styles.loadMoreBtn)}
                        onClick={handleLoadMore}
                        >
                        Xem thêm
                    </button>
                </div>
                )}
            </div>
        </>
    );
}

export default ClientLogin;
