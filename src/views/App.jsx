
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

import Header from "../components/MainContent/Header/Header";

import styles from './App.module.scss'
import clsx from "clsx";
import Sidebar from "../components/Sidebar/Sidebar";
import PlayBox from "../components/PlayBox/PlayBox";
import ListPop from '../components/Albums/ListSong/ListPop';
import ClientLogin from '../pages/ClientLogin/ClientLogin';
function App() {
    
    return (
            
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
                                    <Route path="pop" element={<ListPop />} />
                                    
                                </Route>
                                <Route path="/setting" element={<Setting />} />
                                <Route path="/account/*" element={<Account />} />
                                <Route path="/foryou" element={<ForYou />}>
                                    <Route index element={<Individual />} />
                                    <Route path="formCreate" element={<FormCreate />} />
                                </Route>
                                <Route path="/disc" element={<Disc />} />
                                <Route path="/client" element={<ClientLogin />} />
                            </Routes>
                        </div>
                    </div>
                </div>
    );
}

export default App;