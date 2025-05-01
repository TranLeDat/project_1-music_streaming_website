import ListAlbum from "../../ListAlbum/ListAlbum";
import Songs from "../../Songs/Songs";
import clsx from "clsx";
import styles from './ListPop.module.scss';
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import libraryApi from "../../../../api/libraryApi";

function ListPop() {
    const [searchParams] = useSearchParams();
    const playlistId = searchParams.get("id");
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const res = await libraryApi.getPlaylistById(playlistId);
                setPlaylist(res);
            } catch (error) {
                console.error("Failed to load playlist", error);
            }
        };
        if (playlistId) {
            fetchPlaylist();
        }
    }, [playlistId]);

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }

    if (!playlist) return <p className={styles.loading}>Đang tải...</p>;

    return (
        <div className={clsx(styles.libAlbum)}>
            <div className={clsx(styles.album)}>
                <ListAlbum album={playlist} popl={playlist.tracks.data} />
            </div>
            <div className={clsx(styles.songs)}>
                {playlist.tracks.data.map((song) => (
                    <Songs
                        key={song.id}
                        pop={{
                            img: song.album.cover_medium,
                            title: song.title,
                            artist: song.artist.name,
                            time: formatTime(song.duration),
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default ListPop;
