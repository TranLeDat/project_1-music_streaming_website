import styles from './Favorites.module.scss';
import clsx from 'clsx';
import NotLogin from '../../components/NotLogin/NotLogin';
import { useAuth } from '../../components/AuthContext/AuthContext';
import { useEffect, useRef, useState } from 'react';
import musicApi from '../../api/musicApi';
import favoriteApi from '../../api/favoriteApi';
import Song from '../../components/Song/Song';
import Slider from 'react-slick';
import Outstanding from '../../components/MainContent/OutStanding/Outstanding';

function Favorites() {
  const { isLoggedIn } = useAuth();

  const [outStandings, setOutStandings] = useState([]);
  const outStandingSliderRef = useRef();

  const [favorites, setFavorites] = useState([]);
  const [likes, setLikes] = useState([]);

  const [loadMoreFavorites, setLoadMoreFavorites] = useState(false);
  const [loadMoreLikes, setLoadMoreLikes] = useState(false);

  const [currentPageFavorites, setCurrentPageFavorites] = useState(1);
  const [currentPageLikes, setCurrentPageLikes] = useState(1);

  const [hasMoreFavorites, setHasMoreFavorites] = useState(true);
  const [hasMoreLikes, setHasMoreLikes] = useState(true);

  const limit = 5;

  // Fetch Favorites
  useEffect(() => {
    const fetchFavorites = async (page) => {
      try {
        const res = await favoriteApi.getFavorite({ _limit: limit, _page: page });
        const data = res?.tracks?.data || [];

        if (page === 1) setFavorites(data);
        else setFavorites((prev) => [...prev, ...data]);

        setCurrentPageFavorites(page);
        setHasMoreFavorites(data.length === limit);
      } catch (error) {
        console.error("Error loading favorites", error);
        setHasMoreFavorites(false);
      } finally {
        setLoadMoreFavorites(false);
      }
    };

    if (currentPageFavorites === 1 && favorites.length === 0) fetchFavorites(1);
    if (loadMoreFavorites && hasMoreFavorites) fetchFavorites(currentPageFavorites + 1);
  }, [loadMoreFavorites]);

  // Fetch Likes
  useEffect(() => {
    const fetchLikes = async (page) => {
      try {
        const res = await favoriteApi.getLikeList({ _limit: 5, _page: 30 });
        const data = res?.tracks?.data || [];

        if (page === 1) setLikes(data);
        else setLikes((prev) => [...prev, ...data]);

        setCurrentPageLikes(page);
        setHasMoreLikes(data.length === limit);
      } catch (error) {
        console.error("Error loading likes", error);
        setHasMoreLikes(false);
      } finally {
        setLoadMoreLikes(false);
      }
    };

    if (currentPageLikes === 1 && likes.length === 0) fetchLikes(1);
    if (loadMoreLikes && hasMoreLikes) fetchLikes(currentPageLikes + 1);
  }, [loadMoreLikes]);

  // Fetch outstanding artists
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await musicApi.getTopTracks({ _limit: 10, _index: 10, countryCode: 'vn' });
        setOutStandings(res);
      } catch (error) {
        console.error("Failed to fetch artists", error);
      }
    };

    fetchArtist();
  }, []);

  const outStandingsSetting = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className={clsx(styles.container)}>
      {isLoggedIn ? (
        <div className={clsx(styles.contentLogin)}>
          <div className={clsx(styles.frameLogin)}>

            {/* Likes */}
            <h2 className={clsx(styles.listTitle)}>Danh sách Like</h2>
            <div className={clsx(styles.likeList)}>
              {likes.map((item) => (
                <Song key={item.id} item={item} items={likes} source="like" />
              ))}
              {hasMoreLikes && (
                <div className={clsx(styles.loadMore)}>
                  <button onClick={() => setLoadMoreLikes(true)}>Thêm nữa</button>
                </div>
              )}
            </div>

            {/* Favorites */}
            <h2 className={clsx(styles.listTitle)}>Danh sách Favorite</h2>
            <div className={clsx(styles.favoriteList)}>
              {favorites.map((item) => (
                <Song key={item.id} item={item} items={favorites} source="favorite" />
              ))}
              {hasMoreFavorites && (
                <div className={clsx(styles.loadMore)}>
                  <button onClick={() => setLoadMoreFavorites(true)}>Thêm nữa</button>
                </div>
              )}
            </div>
          </div>

          {/* Outstandings */}
          <div className={clsx(styles.outStandings)}>
            <h2 className={clsx(styles.outStandingTitle)}>Ca sĩ nổi bật</h2>
            <div className={clsx(styles.outStandingSliderWrapper)}>
              <button onClick={() => outStandingSliderRef.current?.slickPrev()} className={clsx(styles.arrowBtn, styles.left)}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <Slider ref={outStandingSliderRef} {...outStandingsSetting} className={clsx(styles.outStandingSlider)}>
                {Array.isArray(outStandings) &&
                  outStandings.map((outStanding) => (
                    <Outstanding key={outStanding.id} outStanding={outStanding} source="favorite" />
                  ))}
              </Slider>
              <button onClick={() => outStandingSliderRef.current?.slickNext()} className={clsx(styles.arrowBtn, styles.right)}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={clsx(styles.notLogin)}>
          <NotLogin />
        </div>
      )}
    </div>
  );
}

export default Favorites;
