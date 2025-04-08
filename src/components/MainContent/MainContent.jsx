import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import styles from './MainContent.module.scss'
import clsx from 'clsx';
import Header from './Header/Header';
import Content from './Content/Content';
import Latest from "./Latest/Latest";



function MainContent({latests,songs}){

    const settings ={
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        // Tùy chỉnh vị trí và style của dots
        dotsClass: "slick-dots custom-dots",
    };
    

    return(
        <>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.header)}>
                    <Header/>
                </div>
                <div className={clsx(styles.contents)}>
                    <Slider {...settings}>
                        {songs.map((song, index) =>(
                            <Content key={index} song={song}  />
                        ))}
                    </Slider>
                    
                </div>
                <div className={clsx(styles.latest)}>
                    <h2 className={clsx(styles.title)}>Mới phát hành</h2>
                    <div className={clsx(styles.info)}>
                        {latests.map((latest)=>(
                            <Latest key={latest.songTitle} latest={latest} />
                        ))}
                    </div>
              
                    
                </div>
            </div>
        </>
    )
}

export default MainContent;