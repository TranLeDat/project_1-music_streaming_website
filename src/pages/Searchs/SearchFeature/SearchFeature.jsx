import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './SearchFeature.module.scss';

SearchFeature.propTypes = {
  result: PropTypes.object.isRequired,
};

function SearchFeature({ result }) {
    // chuẩn bị dữ liệu trước
    const imageUrl = result.album?.cover_medium || result.picture_medium || result.picture || '';
    const title = result.title || result.name || result.genre || 'Unknown';
    const subTitle = result.artist?.name || '';
    const dura = result.duration ;
    const type = result.type;
    
    const minute = Math.floor(dura / 60);
    const second = dura % 60;
    const duration = `${minute}:${second}`
    
    if (type === 'track' || type === 'artist') {
        // Nếu là bài hát hoặc ca sĩ
        return (
            <div className={clsx(styles.frame)} >
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
        );
    } else {
        // Nếu là thể loại (genre hoặc khác)
        return (
        <div className={clsx(styles.infos)}>
            <img src={imageUrl} alt={title} />
            <div className={clsx(styles.info)}>
            <h3 className={clsx(styles.title)}>{title}</h3>
            <p className={clsx(styles.quantity)}>
                {result.nb_tracks ? `${result.nb_tracks} tracks` : 'Unknown quantity'}
            </p>
            </div>
        </div>
        );
    }
}

export default SearchFeature;
