import styles from './PlayBox.module.scss'
import clsx from 'clsx'
import { useState, useEffect, useRef } from 'react';
import img from '../../assets/img/Playbox/tho.jpg'

function PlayBox(){
    //State theo doi tien do (0-100)
    const [progress, setProgress] = useState(0);
    const progressRef = useRef();
    const [isDragging, setIsDragging] =useState(false);
    const [isPlaying, setPlaying] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeated, setIsRepeated] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const audioRef = useRef();

    const songs = [
        {
          title: "Dấu ai đậm hưa",
          artist: "CZEE",
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Link bài hát mẫu
          albumArt: img,
        },
        {
          title: "Bài hát 2",
          artist: "Nghệ sĩ 2",
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          albumArt: img,
        },
        {
          title: "Bài hát 3",
          artist: "Nghệ sĩ 3",
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          albumArt: img,
        },
      ];

    //Cap nhat tien do thoi gian phat
      useEffect(() =>{
        const audio = audioRef.current;
        const updateProgress =()=>{
            if(!isDragging){
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                setProgress(progressPercent);
            }   
        }
        audio.addEventListener('timeupdate', updateProgress);
        return ()=>{
            audio.addEventListener('timeupdate', updateProgress);
        }
      }, [isDragging])
    

    //Xu ly khi ket thuc bai hat
    useEffect(() =>{
        const audio = audioRef.current;
        const handleEnded = ()=>{
            if(isRepeated){
                audio.currentTime = 0;
                audio.play();
            }else{
                handleNext();
            }
        };

        audio.addEventListener('ended', handleEnded);
        return ()=>{
            audio.removeEventListener('ended', handleEnded);
        }
    }, [isRepeated, currentSongIndex])



    //Xu ly keo
    const handleMouseDown =()=>{
        setIsDragging(true);
    }

    //Xu ly nguoi dung keo thanh tien trinh
    const handleMouseMove =(e) =>{
        if(!isDragging) return;

        const progressBar = e.target.closest(`.${styles.progressWrapper}`);
        const rect = progressBar.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newProgress = (offsetX /rect.width) *100;
        setProgress(Math.min(Math.max(newProgress, 0), 100));

        const audio = audioRef.current;
        audio.currentTime = (newProgress / 100) * audio.duration;
    };

    const handleMouseUp = ()=>{
        setIsDragging(false);
    }

    useEffect(() =>{
        if(isDragging){
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }else{
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        return()=>{
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    },[isDragging])


    //Xu ly play/pause
    const handlePlayPause = ()=>{
        const audio = audioRef.current;
        if(isPlaying){
            audio.pause();
            console.log('xu ly play/ pause')
            console.log(isPlaying);
        }else{
            audio.play();
            console.log(isPlaying);
        }
        setPlaying(!isPlaying);
        console.log(isPlaying);
    }


    //Xu ly next song
    const handleNext = ()=>{
        let nextIndex;
        if(isShuffled) {
            nextIndex = Math.floor(Math.random() * songs.length);
            console.log('xu ly next song');
            console.log(isShuffled);
        }else{
            nextIndex = (currentSongIndex + 1) % songs.length;
        }
        setCurrentSongIndex(nextIndex);
        setProgress(0);
        setPlaying(false);
        setTimeout(() =>{
            audioRef.current.play();
            setPlaying(true);
        }, 1000)
    }

    //Xu ly Previous song
    const handlePrev =() =>{
        let prevIndex;
        if(isShuffled){
            prevIndex = Math.floor(Math.random() * songs.length);
            console.log('xu ly prev song');
            console.log(isShuffled);
        }else{
            prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        }
        setCurrentSongIndex(prevIndex);
        setProgress(0);
        setPlaying(false);
        setTimeout(()=>{
            audioRef.current.play();
            setPlaying(true);
        }, 1000)
    }

    //Xu ly shuffle
    const handleShuffle = ()=>{
        setIsShuffled(!isShuffled);
    }

    //Xu ly repeat
    const handleRepeat =()=>{
        setIsRepeated(!isRepeated)
    }
    

    return(
        <>
            <footer id='footer' className={clsx(styles.footer)}>
                <audio ref={audioRef} src={songs[currentSongIndex].src} />
                <div className={clsx(styles.progressWrapper)} 
                    onClick={handleMouseDown}
                    ref={progressRef}
                    >
                    <div className={clsx(styles.progress)} style={{width : `${progress}%`}}>
                        <div className={clsx(styles.progressThumb)}></div>
                    </div>
                </div>
                <div className={clsx(styles.infos)}>
                    <img src={songs[currentSongIndex].albumArt} 
                        alt='album Art'
                        className={clsx(styles.albumArt)}
                    />
                    <div className={clsx(styles.details)}>
                        <h3 className={clsx(styles.title)}>{songs[currentSongIndex].title}</h3>
                        <p className={clsx(styles.artist)}>{songs[currentSongIndex].artist}</p>
                    </div>
                    <div className={clsx(styles.icon)}><i className="fa-solid fa-ellipsis-vertical"></i></div>
                </div>
                <div className={clsx(styles.controls)}>
                    <button className={clsx(styles.controlBtn, {[styles.active] : isShuffled})}
                        onClick={handleShuffle}
                    >
                        <i className="fa-solid fa-shuffle"></i>
                    </button>

                    <button className={clsx(styles.controlBtn)} onClick={handlePrev}>
                        <i class="fa-solid fa-backward"></i>
                    </button>

                    <button className={clsx(styles.controlBtn, styles.playBtn)}
                        onClick={handlePlayPause}
                    >
                        {isPlaying ? <i class="fa-regular fa-circle-play"></i> : <i class="fa-regular fa-circle-pause"></i>}
                    </button>
                    <button className={clsx(styles.controlBtn)} onClick={handleNext} >
                        <i class="fa-solid fa-forward"></i>
                    </button>
                    <button className={clsx(styles.controlBtn, {[styles.active] : isRepeated})}
                        onClick={handleRepeat}
                    >
                        <i class="fa-solid fa-repeat"></i>
                    </button>
                </div>
            </footer>
        </>
    )
}

export default PlayBox;
