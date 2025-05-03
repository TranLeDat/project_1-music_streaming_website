
import clsx from "clsx";
import styles from './UserLogin.module.scss'
import avatar from '../../assets/img/user/avatar.png'
import background from '../../assets/img/user/Rectangle 87.png'
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import libraryApi from "../../api/libraryApi";
import favoriteApi from "../../api/favoriteApi";

function UserLogin(){

    const [activeIndex, setActiveIndex] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [librarys, setLibrarys] = useState([]);


    useEffect(()=>{
        const fetchLibrary = async () =>{
            try {
                const res = await libraryApi.getLibrary();
                console.log('>>> check api library: ', res);
                setLibrarys(res);
                const resfavorite = await favoriteApi.getFavoriteList();
                const trackList = resfavorite?.tracks?.data || [];
                setFavorites(trackList)
            } catch (error) {
                console.log('Failed to fetch lib', error);
            }
        };
        fetchLibrary()
    },[])

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
                                    Đã tạo {librarys.length} danh sách    
                                </Link >
                            </li>

                            <li className={clsx(styles.circle)}></li>
                            <li className={clsx(styles.title )}>   
                                <Link  to='/favorite' className={clsx({[styles.active] : activeIndex === 1} )} 
                                    onMouseOver={() =>setActiveIndex(1)} 
                                    onMouseOut={() => setActiveIndex(null)}>
                                    Đã yêu thích {favorites.length} bài
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
        </>
    )
}

export default UserLogin;