import styles from './Library.module.scss';
import clsx from 'clsx';
import Header from '../../components/MainContent/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import PlayBox from '../../components/PlayBox/PlayBox';
import NotLogin from '../../components/NotLogin/NotLogin';
import { albums } from '../../data';
import Album from '../../components/Albums/Album/Album';
import { useAuth } from '../../components/AuthContext/AuthContext';
import ListVpop from '../../components/Albums/ListSong/ListVpop/ListVpop';
import ListUSUK from '../../components/Albums/ListSong/ListUSUK/ListUSUK';
import ListJpop from '../../components/Albums/ListSong/ListJpop/ListJpop';
import { Routes, Route, Link } from 'react-router-dom';
import ListVpopc from '../../components/Albums/ListSong/ListVpopc/ListVpopc';

function Library() {
    const links = [
        { link: 'V-pop' }, // Đường dẫn tương đối
        { link: 'US-UK' },
        { link: 'J-pop' },
        { link: 'V-popc' },
    ];

    const album1 = albums[0];
    const album2 = albums[1];
    const album3 = albums[2];
    const album4 = albums[3];

    const { isLoggedIn } = useAuth();

    return (
        <div id="container" className={clsx(styles.container)}>
            <div className={clsx(styles.main_left)}>
                <div className={clsx(styles.sidebar)}>
                    <Sidebar />
                </div>
                <div className={clsx(styles.playBox)}>
                    <PlayBox />
                </div>
            </div>
            <div className={clsx(styles.main_right)}>
                <div className={clsx(styles.header)}>
                    <Header />
                </div>
                {isLoggedIn ? (
                    <Routes>
                        {/* Route mặc định hiển thị danh sách album */}
                        <Route
                            path="/"
                            element={
                                <div className={clsx(styles.albums)}>
                                    <ul className={clsx(styles.frameLogin)}>
                                        <li className={clsx(styles.album)}>
                                            <Link to={links[0].link} className={clsx(styles.albumLink)}>
                                                <Album album={album1} />
                                            </Link>
                                        </li>
                                        <li className={clsx(styles.album)}>
                                            <Link to={links[1].link} className={clsx(styles.albumLink)}>
                                                <Album album={album2} />
                                            </Link>
                                        </li>
                                        <li className={clsx(styles.album)}>
                                            <Link to={links[2].link} className={clsx(styles.albumLink)}>
                                                <Album album={album3} />
                                            </Link>
                                        </li>
                                        <li className={clsx(styles.album)}>
                                            <Link to={links[3].link} className={clsx(styles.albumLink)}>
                                                <Album album={album4} />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            }
                        />
                        {/* Các route con với đường dẫn tương đối */}
                        <Route path="V-pop" element={<ListVpop />} />
                        <Route path="US-UK" element={<ListUSUK />} />
                        <Route path="J-pop" element={<ListJpop />} />
                        <Route path="V-popc" element={<ListVpopc />} />
                    </Routes>
                ) : (
                    <div className={clsx(styles.content)}>
                        <div className={clsx(styles.frame)}>
                            <NotLogin />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Library;