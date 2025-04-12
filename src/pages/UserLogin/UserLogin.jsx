
import clsx from "clsx";
import styles from './UserLogin.module.scss'
import { albums } from "../../data";
import { favoriteList } from "../../data";
import avatar from '../../assets/img/user/avatar.png'
import background from '../../assets/img/user/bgc.avif'
import { useState } from "react";
import {Routes, Route, Link} from 'react-router-dom'
import Favorites from "../Favorites/Favorites";
import Library from "../Library/Library";
import ForYou from "../ForYou/ForYou";

function UserLogin(){

    const [activeIndex, setActiveIndex] = useState(false)

    return(
        <>
            <div className={clsx(styles.frameWrapper)}>
                <div className={clsx(styles.bg)}>
                    <img src={background} alt="background" className={clsx(styles.imgBg)} />
                </div>
                <div className={clsx(styles.infos)}>
                    <img src={avatar} alt="avatar" className={clsx(styles.avatar)} />
                    <div className={clsx(styles.content)}>
                        <h3 className={clsx(styles.userName)}>Lương Lê</h3>
                        <ul className={clsx(styles.info)}>
                            <li className={clsx(styles.title)}>
                                <Link to='/library'className={clsx( {[styles.active] : activeIndex === 0})} 
                                    onMouseOver={() =>setActiveIndex(0)} 
                                    onMouseOut={() => setActiveIndex(null)}
                                >
                                    Đã tạo {albums.length} danh sách    
                                </Link >
                            </li>

                            <li className={clsx(styles.circle)}></li>
                            <li className={clsx(styles.title )}>   
                                <Link  to='/favorite' className={clsx({[styles.active] : activeIndex === 1} )} 
                                    onMouseOver={() =>setActiveIndex(1)} 
                                    onMouseOut={() => setActiveIndex(null)}>
                                    Đã yêu thích {favoriteList.length} bài
                                </Link >
                            </li>

                            <li className={clsx(styles.circle)}></li>
                            <li className={clsx(styles.title)}
                                
                            >
                                <Link  to='/foryou' className={clsx({[styles.active] : activeIndex === 2})}
                                    onMouseOver={() =>setActiveIndex(2)} 
                                    onMouseOut={() => setActiveIndex(null)}
                                >Đã đăng tải 3 bài hát</Link >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
          <Routes>
            <Route path='/library/*' element={<Library/>} />
            <Route path='/favorite' element={<Favorites/>} />
            <Route path='/foryou' element={<ForYou/>} />
          </Routes>
        </>
    )
}

export default UserLogin;