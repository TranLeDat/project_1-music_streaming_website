import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './TracksSeen.module.scss'
import { Link } from 'react-router-dom';


TracksSeen.propTypes = {
//   track.PropTypes.object
};

function TracksSeen({track, tracks}) {
  return (
    <>
        <Link to='/disc' key={track.id} className={clsx(styles.route)} state={{ song: track, songList: tracks, source:'account' }}>
            <div key={track.id} className={clsx(styles.songItems)}>
                 <div className={clsx(styles.songItem)}>
                    <i className="fa-solid fa-music"></i>
                    <img src={track.img} alt={track.title} className={clsx(styles.image)} />
                    <div className={clsx(styles.info)}>
                        <h3 className={clsx(styles.title)}>{track.title}</h3>
                        <p className={clsx(styles.artist)}>{track.artist?.name}</p>
                    </div>
                    <p className={clsx(styles.time)}>
                        {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
                    </p>
                </div>
                <div className={clsx(styles.hr)}></div>
            </div>
        </Link>                
    </>
  );
}

export default TracksSeen;