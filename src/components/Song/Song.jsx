// Song.jsx
import clsx from 'clsx';
import styles from './Song.module.scss';
import { Link } from 'react-router-dom';

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function Song({ item, items, source }) {
  return (
    <div className={clsx(styles.frame)}>
        <Link
            to={{
              pathname: '/disc',
              search: `?songId=${item.id}&source=${source}`,
            }}
            state={{ songList: items }}
            className={clsx(styles.route)}
        >
            <div key={item.id} className={clsx(styles.songItems)}>
            <div className={clsx(styles.songItem)}>
                <i className="fa-solid fa-music"></i>
                <img
                  src={item.album?.cover_small || item.img || 'https://via.placeholder.com/100'}
                  alt={item.title}
                  className={clsx(styles.image)}
                />
                <div className={clsx(styles.info)}>
                  <h3 className={clsx(styles.title)}>{item.title}</h3>
                  <p className={clsx(styles.artist)}>{item.artist?.name || item.artist}</p>
                </div>
                <p className={clsx(styles.time)}>{formatTime(item.duration)}</p>
            </div>
            <div className={clsx(styles.hr)}></div>
            </div>
        </Link>
    </div>
  );
}

export default Song;
