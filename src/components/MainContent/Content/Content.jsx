import styles from './Content.module.scss';
import clsx from "clsx";
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

function Content({ content, contents }) {
    const navigate = useNavigate();

    const handlePlay = () => {
        const query = queryString.stringify({ songId: content.id });
        navigate({
            pathname: '/disc',
            search: `?${query}`,
        }, {
            state: { songList: contents, source: 'home' }
        });
    };

    return (
        <>
            <div className={clsx(styles.songItem)}>
                <img
                    src={content.album?.cover_big}
                    alt={content.title}
                    className={clsx(styles.cover)}
                />
                <div className={clsx(styles.songDetail)}>
                    <h3 className={clsx(styles.title)}>{content.title}</h3>
                    <h3 className={clsx(styles.artist)}>{content.artist?.name}</h3>
                </div>
                <div className={clsx(styles.actions)}>
                    <button className={clsx(styles.actionBtn)}>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                    <button className={clsx(styles.actionBtn)}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                    <button className={clsx(styles.actionBtn, styles.actionHeart)}>
                        <i class="fa-solid fa-heart"></i>
                    </button>
                    <button onClick={handlePlay} className={clsx(styles.playBtn)}>
                        <i className="fa-solid fa-circle-play"></i>
                        <span className={clsx(styles.titlePlay)}>Play</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Content;
