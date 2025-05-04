import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import clsx from "clsx";
import styles from './Home.module.scss'
import React, { useEffect, useRef, useState } from "react";
import Outstanding from "../../components/MainContent/OutStanding/Outstanding";
import Content from "../../components/MainContent/Content/Content";
import Latest from "../../components/MainContent/Latest/Latest"
import musicApi from "../../api/musicApi";


function Home(){

  const [contents, setContents] = useState([]);
  const [latests, setLatests] = useState([]);
  const [outStandings, setOutStandings] = useState([]);

  const latestSliderRef = useRef(null);
  const outStandingSliderRef = useRef(null);


  const fetchSectionTracks = async (_index, countryCode, setter) =>{
    try {
      const res = await musicApi.getTopTracks({_limit: 10, _index, countryCode });
      setter(res)
    } catch (error) {
      console.log('Failed to fetch tracks', error)
    }
  }
  
  useEffect(()=>{
    fetchSectionTracks(0, 'vn', setContents);
    fetchSectionTracks(15, 'vn', setLatests);
    fetchSectionTracks(10, 'vn', setOutStandings);
  }, [])

      const settingContent = {
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
          <div style={{ position: 'absolute', bottom: '5px', width: '100%' }}>
            <ul style={{ margin: 0, padding: 0 }}>{dots}</ul>
          </div>
        ),
        customPaging: i => (
          <div style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.5)'
          }}></div>
        )
      };

      const latestSetting ={
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
      
      const handleNextLatest =() =>{
        latestSliderRef.current?.slickNext();
      }
      const handlePrevLatest =() =>{
        latestSliderRef.current?.slickPrev();
      }

      const handleNextOutStanding =() =>{
        outStandingSliderRef.current?.slickNext();
      }
      const handlePrevOutStanding =() =>{
        outStandingSliderRef.current?.slickPrev();
      }


      
    
    return(
        <>
          {/* {contnet} */}
          <div className={clsx(styles.contents)}>
              <div className={styles.sliderWrapper}> 
                <Slider {...settingContent}>
                  {contents.map((content) => (
                    <div key={content.id} className={styles.slideItem}> 
                      <Content content={content} contents={contents} />
                    </div>
                  ))}
                </Slider>
              </div>
          </div>
          
          {/* {latest} */}
          <div className={clsx(styles.latests)}>
            <h2 className={clsx(styles.latestTitle)}>Mới phát hành</h2>
            <div className={clsx(styles.latestSliderWrapper)}>
              <button onClick={handlePrevLatest} className={clsx(styles.arrowBtn, styles.left)}>
              <i className="fa-solid fa-chevron-left"></i>
              </button>

              <Slider ref={latestSliderRef} className={clsx(styles.latestSlider)} {...latestSetting}>
                {Array.isArray(latests) && latests.map((latest) => (
                  <Latest key={latest.id} latest={latest} latests={latests} />
                ))}
              </Slider>

              <button onClick={handleNextLatest} className={clsx(styles.arrowBtn, styles.right)}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

        {/* {outStanding} */}
          <div className={clsx(styles.outStandings)}>
            <h2 className={clsx(styles.outStandingTitle)}>Ca sĩ nổi bật</h2>
            <div className={clsx(styles.outStandingSliderWrapper)}>
              <button onClick={handlePrevOutStanding} className={clsx(styles.arrowBtn, styles.left)}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              <Slider ref={outStandingSliderRef} className={clsx(styles.outStandingSlider)} {...outStandingsSetting}>
                {Array.isArray(outStandings) && outStandings.map((outStanding) => (
                  <Outstanding key={outStanding.id} outStanding={outStanding} source="home" />
                ))}
              </Slider>

              <button onClick={handleNextOutStanding} className={clsx(styles.arrowBtn, styles.right)}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
  
        </>
    )
}

export default Home;
