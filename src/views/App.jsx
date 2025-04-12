import "./App.scss";
import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home/Home";
import Search from "../pages/Searchs/Search";
import Toolbar from "../components/Sidebar/ToolBar/ToolBar";
import Library from "../pages/Library/Library";
import Favorites from "../pages/Favorites/Favorites";
import Setting from "../pages/Setting/Setting";
import Account from "../pages/User/Account";
import ForYou from "../pages/ForYou/ForYou";
import Disc from "../components/Music/DIsc/Disc";
import { AuthProvider } from "../components/AuthContext/AuthContext";
import FormCreate from "../components/SongCRUD/FormCreate/FormCreate";
import Individual from "../components/SongCRUD/Individual/Individual";

function App() {
    return (
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/favorite" element={<Favorites />} />
                    <Route path="/library/*" element={<Library />} />
                    <Route path="/setting" element={<Setting />} />
                    <Route path="/account/*" element={<Account />} />
                    <Route path="/foryou" element={<ForYou />}>
                        <Route index element={<Individual />} />
                        <Route path="formCreate" element={<FormCreate />} />
                    </Route>
                    <Route path="/disc" element={<Disc />} />
                </Routes>
            </AuthProvider>
    );
}

export default App;