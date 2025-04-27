
import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home/Home";
import Search from "../pages/Searchs/Search";

import Library from "../pages/Library/Library";
import Favorites from "../pages/Favorites/Favorites";
import Setting from "../pages/Setting/Setting";
import Account from "../pages/User/Account";
import ForYou from "../pages/ForYou/ForYou";
import Disc from "../components/Music/DIsc/Disc";
import { AuthProvider } from "../components/AuthContext/AuthContext";
import FormCreate from "../components/SongCRUD/FormCreate/FormCreate";
import Individual from "../components/SongCRUD/Individual/Individual";
import ListVpop from "../components/Albums/ListSong/ListVpop/ListVpop";
import ListUSUK from "../components/Albums/ListSong/ListUSUK/ListUSUK";
import ListJpop from "../components/Albums/ListSong/ListJpop/ListJpop";
import ListVpopc from "../components/Albums/ListSong/ListVpopc/ListVpopc";
import Header from "../components/MainContent/Header/Header";

import styles from './App.module.scss'
import clsx from "clsx";
import Sidebar from "../components/Sidebar/Sidebar";
import PlayBox from "../components/PlayBox/PlayBox";

function App() {
    return (
            <AuthProvider>
                <div className={clsx(styles.container)}>
                    <div className={clsx(styles.left)}>
                        <div className={clsx(styles.sidebar)}>
                            <Sidebar/>
                        </div>
                        <div className={clsx(styles.playbox)}>
                            <PlayBox/>
                        </div>
                    </div>
                    <div className={clsx(styles.right)}>
                        <div className={clsx(styles.header)}>
                            <Header/>
                        </div>
                        <div className={clsx(styles.main)}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/search" element={<Search />} />
                                <Route path="/favorite" element={<Favorites />} />
                                <Route path="/library" element={<Library />}>
                                    <Route path="V-pop" element={<ListVpop />} />
                                    <Route path="US-UK" element={<ListUSUK />} />
                                    <Route path="J-pop" element={<ListJpop />} />
                                    <Route path="V-popc" element={<ListVpopc />} />
                                </Route>
                                <Route path="/setting" element={<Setting />} />
                                <Route path="/account/*" element={<Account />} />
                                <Route path="/foryou" element={<ForYou />}>
                                    <Route index element={<Individual />} />
                                    <Route path="formCreate" element={<FormCreate />} />
                                </Route>
                                <Route path="/disc" element={<Disc />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </AuthProvider>
    );
}

export default App;