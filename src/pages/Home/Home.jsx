import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import clsx from "clsx";
import styles from './Home.module.scss'
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import PlayBox from "../../components/PlayBox/PlayBox";
// import MainContent from "../../components/MainContent/MainContent";
import Header from "../../components/MainContent/Header/Header";
import Content from "../../components/MainContent/Content/Content";
import Latest from "../../components/MainContent/Latest/Latest"
import img1 from '../../assets/img/Content/img1.jpg'


function Home(){

    const songs = [
        {
          title: "Vì Anh Đâu Có Biết",
          artist: "Madihu",
          albumArt: img1, // Thay bằng link hình ảnh thực tế
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        },
        {
          title: "Bài hát 2",
          artist: "Nghệ sĩ 2",
          albumArt: img1,
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        },
        {
          title: "Bài hát 3",
          artist: "Nghệ sĩ 3",
          albumArt: img1,
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        },
      ];

      const latests = [
        {
          songTitle: "Shape of You",
          artist: "Ed Sheeran",
          image: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96"
        },
        {
          songTitle: "Blinding Lights",
          artist: "The Weeknd",
          image: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452"
        },
        {
          songTitle: "Bad Guy",
          artist: "Billie Eilish",
          image: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452"
        },
        {
          songTitle: "Uptown Funk",
          artist: "Mark Ronson ft. Bruno Mars",
          image: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452"
        },
        {
          songTitle: "Rolling in the Deep",
          artist: "Adele",
          image: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452"
        }
      ];

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        // Custom dots container nếu cần
        appendDots: dots => (
          <div style={{ position: 'absolute', bottom: '20px', width: '100%' }}>
            <ul style={{ margin: 0, padding: 0 }}>{dots}</ul>
          </div>
        ),
        customPaging: i => (
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.5)'
          }}></div>
        )
      };

      

    return(
        <>
            <div id="container" className={clsx(styles.container)}>
                <div className={clsx(styles.main_left)}>
                    <div className={clsx(styles.sidebar)}>
                        <Sidebar />
                    </div>
                    <div className={clsx(styles.playBox)}>
                        <PlayBox/>
                    </div>
                </div>
                <div className={clsx(styles.main_right)}>
                    <div className={clsx(styles.header)}>
                        <Header/>
                    </div>
                    <div className={clsx(styles.contents)}>
                      <div className={styles.sliderWrapper}> {/* Thêm wrapper này */}
                        <Slider {...settings}>
                          {songs.map((song, index) => (
                            <div key={index} className={styles.slideItem}> {/* Thêm class slideItem */}
                              <Content song={song} />
                            </div>
                          ))}
                        </Slider>
                      </div>
                    </div>
                    <div className={clsx(styles.latests)}>
                      {latests.map((latest)=>(
                        <Latest key={latest.songTitle} latest={latest} />
                      ))}   
                    </div>

                    
                </div>
               
            </div>
        </>
    )
}

export default Home;