import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './SearchFeature.module.scss';
import { Link } from 'react-router-dom';

SearchFeature.propTypes = {
  result: PropTypes.object.isRequired,
};

function SearchFeature({ result, results }) {
    // chuẩn bị dữ liệu trước
    const imageUrl = result.album?.cover_medium || result.picture_medium || result.picture || '';
    const title = result.title || result.name || result.genre || 'Unknown';
    const subTitle = result.artist?.name || '';

    
    const dura = result.duration || 0;
    const minute = Math.floor(dura / 60);
    const second = String(dura % 60).padStart(2, '0');
    const duration = `${minute}:${second}`;

    return (
        <Link to="/disc" state={{ song: result, songList: results }} className={clsx(styles.link)} >
            <div className={clsx(styles.frame)}>
                <div className={clsx(styles.infos)}>
                    <img src={imageUrl} alt={title} className={clsx(styles.cover)} />
                    <div className={clsx(styles.info)}>
                        <h3 className={clsx(styles.title)}>{title}</h3>
                        <p className={clsx(styles.artist)}>{subTitle}</p>
                    </div>
                    <p className={clsx(styles.duration)}>{duration}</p>
                </div>
                <div className={clsx(styles.hr)}></div>
            </div>
        </Link>
    );
}

export default SearchFeature;
