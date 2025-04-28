import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import clsx from "clsx";
import styles from './Home.module.scss'
import React, { useEffect, useState } from "react";
import Outstanding from "../../components/MainContent/OutStanding/Outstanding";
import Content from "../../components/MainContent/Content/Content";
import Latest from "../../components/MainContent/Latest/Latest"

import { songs, artists } from "../../../src/data";
import musicApi from "../../api/musicApi";

function Home(){

      
      const [latests, setLatests] = useState([]);
      const [outStandings, setOutStandings] = useState([]);

      useEffect(()=>{
        const fetchTracks = async() =>{
          try {
              const res = await musicApi.getTopTracks({ _limit: 5, _index: 0});
              setLatests(res);
              console.log('>>> check latest',res)
          } catch (error) {
            console.log('Failed to fetch track list', error)
          }
        };
        fetchTracks();
      }, [])
      useEffect(()=>{
        const fetchTracks = async() =>{
          try {
              const res = await musicApi.getTopTracks({ _limit: 5, _index: 10});
              setOutStandings(res);
              console.log('>>> check outStanding',res)
          } catch (error) {
            console.log('Failed to fetch track list', error)
          }
        };
        fetchTracks();
      }, [])


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
      
    
    return(
        <>
          <div className={clsx(styles.contents)}>
              <div className={styles.sliderWrapper}> 
                <Slider {...settings}>
                  {songs.map((song, index) => (
                    <div key={index} className={styles.slideItem}> 
                      <Content song={song} />
                    </div>
                  ))}
                </Slider>
              </div>
          </div>
          <div className={clsx(styles.latests)}>
            <h2 className={clsx(styles.latestTitle)}>Mới phát hành</h2>
              <div className={clsx(styles.latest)}>
              {Array.isArray(latests) && latests.map((latest) => (
                <Latest key={latest.id} latest={latest} />
              ))}
              </div>                
          </div>
          <div className={clsx(styles.outStandings)}>
            <h2 className={clsx(styles.outStandingTitle)}>Ca sĩ nổi bật</h2>
            <div className={clsx(styles.outStanding)}>
              {Array.isArray(outStandings) && outStandings.map((outStanding) => (
                <Outstanding key={outStanding.id} outStanding={outStanding} />
              ))}
            </div>
          </div>   
        </>
    )
}

export default Home;
