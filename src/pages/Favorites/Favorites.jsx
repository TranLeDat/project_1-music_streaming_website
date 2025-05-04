import styles from './Favorites.module.scss'
import clsx from 'clsx';
import NotLogin from '../../components/NotLogin/NotLogin';
import FavoriteLogged from '../../components/Loggedin/FavoriteLogin/FavoriteLogged';
import { listLiked} from '../../../src/data';
import { useAuth } from '../../components/AuthContext/AuthContext';
import Outstanding from '../../components/MainContent/OutStanding/Outstanding';
import { useEffect, useRef, useState } from 'react';
import musicApi from '../../api/musicApi';
import Slider from 'react-slick';
import favoriteApi from '../../api/favoriteApi';

function Favorites(){
    const {isLoggedIn} = useAuth();

    const [outStandings, setOutStandings] = useState([]);
    const outStandingSliderRef = useRef();
    const [loadMore, setLoadMore] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [hasMove, setHasMove] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5; 

    const _index = 10;
    const countryCode = 'vn';

    useEffect(() => {
        const fetchTracks = async (page) => {
            try {
                const res = await favoriteApi.getFavorite({
                    _limit: limit,
                    _page: page,
                });
                const trackList = res?.tracks?.data || [];
    
                // nếu là trang đầu (1) thì set mới
                if (page === 1) {
                    setFavorites(trackList);
                } else {
                    setFavorites((prev) => [...prev, ...trackList]);
                }
    
                setCurrentPage(page);
                setHasMove(trackList.length === limit);
            } catch (error) {
                console.log("Failed to fetch data", error);
                setHasMove(false);
            } finally {
                setLoadMore(false); // reset lại trạng thái
            }
        };
    
        // load page 1 khi vừa vào
        if (currentPage === 1 && favorites.length === 0) {
            fetchTracks(1);
        }
    
        // load thêm khi người dùng nhấn nút
        if (loadMore && hasMove) {
            fetchTracks(currentPage + 1);
        }
    }, [loadMore]);
    
    

   
    useEffect(()=>{
        const fetchArtist = async ()=>{
            try {
                const res = await musicApi.getTopTracks({_limit: 10, _index, countryCode});
                setOutStandings(res);
                console.log('>>> check data: ', res)
            } catch (error) {
                console.log('Failed to fetch artist', error)
            }
        }
       fetchArtist();
    },[]);



    const outStandingsSetting ={
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows : false,
        responsive : [
          {
            breakpoint: 1024,
            settings:{
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 768,
            settings:{
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 480,
            settings:{
              slidesToShow: 1,
            }
          },
        ]
    }

    const handleNextOutStanding =() =>{
        outStandingSliderRef.current?.slickNext();
    }
    const handlePrevOutStanding =() =>{
        outStandingSliderRef.current?.slickPrev();
    }

   

    return(
        <>
            <div className={clsx(styles.container)}>      
                {isLoggedIn ? 
                    <div className={clsx(styles.contentLogin)}>
                        <div className={clsx(styles.frameLogin)}>
                            
                            <div className={clsx(styles.frameSeen)}>
                                <FavoriteLogged  listLiked={listLiked} favoriteList={favorites} />
                            </div>
                            {hasMove && (
                                <div className={clsx(styles.move)}>
                                    <button className={clsx(styles.btnMove)} onClick={() => setLoadMore(true)}>Thêm nữa</button>
                                </div>
                            )}
                        </div>
                        <div className={clsx(styles.outStandings)}>
                            <h2 className={clsx(styles.outStandingTitle)}>Ca sĩ nổi bật</h2>
                            <div className={clsx(styles.outStandingSliderWrapper)}>
                            <button onClick={handlePrevOutStanding} className={clsx(styles.arrowBtn, styles.left)}>
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>

                            <Slider ref={outStandingSliderRef} className={clsx(styles.outStandingSlider)} {...outStandingsSetting}>
                                {Array.isArray(outStandings) && outStandings.map((outStanding) => (
                                <Outstanding key={outStanding.id} outStanding={outStanding} source="favorite" />
                                ))}
                            </Slider>

                            <button onClick={handleNextOutStanding} className={clsx(styles.arrowBtn, styles.right)}>
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                            </div>
                        </div> 
                    </div>       
                :
                    <div className={clsx(styles.notLogin)}>
                        <NotLogin/>
                    </div>
                }
            </div>
        </>
    )
}

export default Favorites;