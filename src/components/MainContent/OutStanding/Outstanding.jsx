import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Outstanding.module.scss';

function Outstanding({ outStanding, source }) {
  return (
    <Link
    to="/client"
    state={{ artistId: outStanding.artist?.id, source }}
      className={clsx(styles.outStanding)}
    >
      <div className={clsx(styles.wrapper)}>
        <img
          src={outStanding.artist?.picture_small}
          alt={outStanding.artist?.name}
          className={clsx(styles.image)}
        />
      </div>
      <h3 className={clsx(styles.name)}>{outStanding.artist?.name}</h3>
    </Link>
  );
}

export default Outstanding;
