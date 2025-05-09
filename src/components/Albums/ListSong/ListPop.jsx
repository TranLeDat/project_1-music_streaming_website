import ListAlbum from "../ListAlbum/ListAlbum";
import Song from '../../Song/Song'
import clsx from "clsx";
import styles from './ListPop.module.scss';
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import libraryApi from "../../../api/libraryApi";

function ListPop() {
    const [searchParams] = useSearchParams();
    const playlistId = searchParams.get("id");
    const [playlist, setPlaylist] = useState(null);
    const [visibleCount, setVisibleCount] = useState(10); 

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const res = await libraryApi.getPlaylistById(playlistId);
                setPlaylist(res);
                setVisibleCount(10); 
            } catch (error) {
                console.error("Failed to load playlist", error);
            }
        };
        if (playlistId) {
            fetchPlaylist();
        }
    }, [playlistId]);

    if (!playlist) return <p className={styles.loading}>Đang tải...</p>;

    const allSongs = playlist.tracks.data || [];
    const visibleSongs = allSongs.slice(0, visibleCount);
    const canLoadMore = visibleCount < allSongs.length;


    return (
        <div className={clsx(styles.libAlbum)}>
            <div className={clsx(styles.album)}>
                <ListAlbum playlist={playlist}  />
            </div>
            <div className={clsx(styles.songs)}>
                {visibleSongs.map((song) =>
                    song && song.album ? (
                        <Song key={song.id} item={song} items={visibleSongs} source='library' />
                    ) : null
                )}
                {canLoadMore && (
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
        </div>
    );
}

export default ListPop;
