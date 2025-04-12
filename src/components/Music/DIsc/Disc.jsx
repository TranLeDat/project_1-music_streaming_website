import audio1 from '../../../assets/audio/LẠ LÙNG - Vũ. (Original).mp3';
import audio2 from '../../../assets/audio/Madihu - Có em (Feat. Low G) [Official MV].mp3';
import audio3 from '../../../assets/audio/Sài Gòn Hôm Nay Mưa (Lo-fi) - Hoàng Duyên ft. JSOL.mp3';
import img1 from '../../../assets/img/Favorite/la-lung.jpg';
import img2 from '../../../assets/img/Favorite/co-em.jpg';
import img3 from '../../../assets/img/Favorite/sai-gon-mua.jpg';
import clsx from "clsx";
import styles from './Disc.module.scss';
import { useState, useRef, useEffect } from "react";
import { useNavigate} from 'react-router-dom'; 
const songs = [
  {
    id: 1,
    title: "Lạ Lùng",
    img: img1,
    artist: "Vũ",
    lyrics: [
      "Anh la lùng, em không thể hiểu nổi,",
      "Tại sao anh cứ đi theo em hoài thôi,",
      "Dù em chẳng nói gì, chẳng hề mỉm cười,",
      "Anh vẫn thấy vui từng giây phút trôi.",
      "",
      "[ĐK]",
      "La lùng là anh, la lùng là anh,",
      "Yêu em từ cái nhìn đầu tiên,",
      "La lùng là anh, la lùng là anh,",
      "Chẳng cần lý do để say mê.",
      "",
      "---",
      "",
      "Vũ"
    ],
    duration: 230, // 3:50 = 230 giây
    src: audio1
  },
  {
    id: 2,
    title: "Có Em",
    img: img2,
    artist: "Madihu, Low G",
    lyrics: [
      "Có em ở đây rồi, anh chẳng cần đi đâu xa,",
      "Chỉ cần em bên anh, là đủ ấm cả bầu trời,",
      "Nhìn em cười, lòng anh xao xuyến,",
      "Từng giây phút bên em là thiên đường.",
      "",
      "[Low G]",
      "Có em, có em, có em là đủ,",
      "Dù trời có mưa giông, anh vẫn thấy nắng,",
      "Có em, có em, anh chẳng sợ gì,",
      "Vì em là nhà, là nơi anh thuộc về.",
      "",
      "---",
      "",
      "Madihu & Low G"
    ],
    duration: 252, // 4:12 = 252 giây
    src: audio2
  },
  {
    id: 3,
    title: "Sài Gòn Hôm Nay Mưa",
    img: img3,
    artist: "JSOL, Hoàng Duyên",
    lyrics: [
      "Sài Gòn hôm nay mưa, mưa rất to,",
      "Con đường quen vắng lặng, chẳng bóng ai qua,",
      "Ngồi bên hiên café, lòng chợt nhớ,",
      "Nhớ người em Sài Gòn, nhớ da diết.",
      "",
      "[Hoàng Duyên]",
      "Mưa rơi ướt vai, mưa rơi đầy,",
      "Lòng anh thầm gọi tên em say đắm,",
      "Sài Gòn mưa, lòng anh cũng mưa,",
      "Vì nhớ em, nhớ em đến nao lòng.",
      "",
      "---",
      "",
      "JSOL & Hoàng Duyên"
    ],
    duration: 218, // 3:38 = 218 giây
    src: audio3
  }
];

function Disc() {

    const navigate = useNavigate(); 

    const audioRef = useRef();
    const progressRef = useRef();
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setPlaying] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeated, setIsRepeated] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const currentSong = songs[currentSongIndex];

  // Cập nhật thời gian hiện tại và tiến trình
  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (!isDragging) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        setProgress(progressPercent);
        setCurrentTime(audio.currentTime);
      }
    };
    audio.addEventListener('timeupdate', updateProgress);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [isDragging]);

  // Xử lý khi hết bài hát
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      if (isRepeated) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeated, currentSongIndex]);

  // Xử lý kéo thanh tiến trình
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newProgress = (offsetX / rect.width) * 100;
    setProgress(Math.min(Math.max(newProgress, 0), 100));

    const audio = audioRef.current;
    audio.currentTime = (newProgress / 100) * audio.duration;
    setCurrentTime(audio.currentTime);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!isPlaying);
  };

  const handlePrev = () => {
    let prevIndex;
    if (isShuffled) {
      prevIndex = Math.floor(Math.random() * songs.length);
    } else {
      prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    }
    setCurrentSongIndex(prevIndex);
    setProgress(0);
    setCurrentTime(0);
    setPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setPlaying(true);
    }, 100);
  };

  const handleNext = () => {
    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }
    setCurrentSongIndex(nextIndex);
    setProgress(0);
    setCurrentTime(0);
    setPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setPlaying(true);
    }, 100);
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const handleRepeat = () => {
    setIsRepeated(!isRepeated);
  };

  const handleBack = () => {
    navigate(-1);
    console.log("Quay lại");
  };


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div
      className={clsx(styles.container)}
      style={{ backgroundImage: `url(${currentSong.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className={clsx(styles.navigation)}>
        <button className={clsx(styles.back)} onClick={handleBack}>
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <button className={clsx(styles.notification)}>
          <i className="fa-solid fa-bell"></i>
        </button>
      </div>
      <div className={clsx(styles.content)}>
        <div className={clsx(styles.song)}>
          <div className={clsx(styles.discWrapper)}>
            <div className={clsx(styles.disc)}>
              <img src={currentSong.img} alt="img" className={clsx(styles.image, { [styles.playing]: isPlaying })} />
              <div className={clsx(styles.overlayText)}>
                {currentSong.title.toUpperCase()} {currentSong.artist.toUpperCase()}
              </div>
            </div>
          </div>
          <div className={clsx(styles.infos)}>
            <div className={clsx(styles.info)}>
              <div className={clsx(styles.title)}>
                <h3 className={clsx(styles.name)}>{currentSong.title}</h3>
                <p className={clsx(styles.desc)}>{currentSong.artist}</p>
              </div>
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className={clsx(styles.controls)}>
              <audio ref={audioRef} src={currentSong.src} />
              <div className={clsx(styles.progressWrapper)} ref={progressRef}>
                <span className={clsx(styles.current)}>{formatTime(currentTime)}</span>
                <div className={clsx(styles.progressTrack)} onMouseDown={handleMouseDown}>
                  <div className={clsx(styles.progress)} style={{ width: `${progress}%` }}>
                    <div className={clsx(styles.progressThumb)}></div>
                  </div>
                </div>
                <span className={clsx(styles.totalTime)}>{formatTime(currentSong.duration)}</span>
              </div>
              <div className={clsx(styles.control)}>
                <button
                  className={clsx(styles.btn, styles.btnShuffle, { [styles.active]: isShuffled })}
                  onClick={handleShuffle}
                >
                  <i className="fa-solid fa-shuffle"></i>
                </button>
                <button className={clsx(styles.btn, styles.btnback)} onClick={handlePrev}>
                  <i className="fa-solid fa-backward"></i>
                </button>
                <button className={clsx(styles.btn, styles.playBtn)} onClick={handlePlayPause}>
                  {isPlaying ? (
                    <i className="fa-solid fa-pause"></i>
                  ) : (
                    <i className="fa-solid fa-play"></i>
                  )}
                </button>
                <button className={clsx(styles.btn, styles.btnnext)} onClick={handleNext}>
                  <i className="fa-solid fa-forward"></i>
                </button>
                <button
                  className={clsx(styles.btn, styles.btnRepeat, { [styles.active]: isRepeated })}
                  onClick={handleRepeat}
                >
                  <i className="fa-solid fa-repeat"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(styles.lyrics)}>
          <pre className={clsx(styles.lyric)}>
            {currentSong.lyrics.join('\n')}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Disc;