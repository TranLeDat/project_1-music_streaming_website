import "./App.scss";
import Home from "../pages/Home/Home";
import Search from "../pages/Searchs/Search";
import { Routes, Route } from 'react-router-dom';
import Toolbar from "../components/Sidebar/ToolBar/ToolBar";
import Library from "../pages/Library/Library";
import Favorites from "../pages/Favorites/Favorites";
import Setting from "../pages/Setting/Setting";
import Account from "../pages/User/Account";
import { AuthProvider } from "../components/AuthContext/AuthContext";

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/favorite" element={<Favorites />} />
                    <Route path="/library/*" element={<Library />} />
                    <Route path="/setting" element={<Setting />} />
                    <Route path="/account" element={<Account />} />
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;