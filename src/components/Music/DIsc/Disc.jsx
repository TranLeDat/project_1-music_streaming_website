import clsx from 'clsx';
import styles from './Disc.module.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRecentSong } from '../../../store/recentSlice';
import { setCurrentSong, setPlaylist } from '../../../store/playSlice';

function Disc() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const songId = searchParams.get('songId');

  const { songList, song } = location.state || {};

  const normalizeSong = (item) => ({
    id: item.id,
    title: item.title || 'Unknown Title',
    artist: typeof item.artist === 'object' ? item.artist.name : item.artist || 'Unknown Artist',
    img: item.album?.cover_medium || item.img || 'https://via.placeholder.com/150',
    src: item.preview || item.src || '',
    duration: item.duration || 0,
    lyrics: item.lyrics || [''],
  });

  const songs = useMemo(() => {
    if (Array.isArray(songList)) return songList.map(normalizeSong);
    if (song) return [normalizeSong(song)];
    return [];
  }, [songList, song]);

  const [currentSongIndex, setCurrentSongIndex] = useState(() => {
    const index = songs.findIndex((s) => String(s.id) === String(songId));
    return index !== -1 ? index : 0;
  });

  const audioRef = useRef();
  const progressRef = useRef();
  const [isPlaying, setPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (currentSong) {
      dispatch(addRecentSong(currentSong));
      dispatch(setCurrentSong(currentSong));
      dispatch(setPlaylist(songs));
    }
  }, [currentSongIndex]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio.src) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setPlaying(!isPlaying);
  };

  const handlePrev = () => {
    const index = isShuffled
      ? Math.floor(Math.random() * songs.length)
      : (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(index);
    setPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setPlaying(true);
    }, 100);
  };

  const handleNext = () => {
    const index = isShuffled
      ? Math.floor(Math.random() * songs.length)
      : (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(index);
    setPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setPlaying(true);
    }, 100);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (!isDragging && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };
    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [isDragging]);

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
    return () => audio.removeEventListener('ended', handleEnded);
  }, [isRepeated, currentSongIndex]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = progressRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    const audio = audioRef.current;
    audio.currentTime = (newProgress / 100) * audio.duration;
    setCurrentTime(audio.currentTime);
    setProgress(newProgress);
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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div
      className={clsx(styles.container)}
      style={{
        backgroundImage: `url(${currentSong.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={clsx(styles.content)}>
        <div className={clsx(styles.song)}>
          <div className={clsx(styles.discWrapper)}>
            <div className={clsx(styles.disc)}>
              <img
                src={currentSong.img}
                alt="img"
                className={clsx(styles.image, { [styles.playing]: isPlaying })}
              />
              <div className={clsx(styles.overlayText)}>
                {currentSong.title.toUpperCase()}<br />
                {currentSong.artist.toUpperCase()}
              </div>
            </div>
          </div>
          <div className={clsx(styles.infos)}>
            <div className={clsx(styles.info)}>
              <div className={clsx(styles.title)}>
                <h3 className={clsx(styles.name)}>{currentSong.title}</h3>
                <p className={clsx(styles.desc)}>{currentSong.artist}</p>
              </div>
              <i class="fa-solid fa-heart"></i>
            </div>
            <div className={clsx(styles.controls)}>
              {currentSong.src && <audio ref={audioRef} src={currentSong.src} />}
              <div className={clsx(styles.progressWrapper)} ref={progressRef}>
                <span className={clsx(styles.current)}>{formatTime(currentTime)}</span>
                <div
                  className={clsx(styles.progressTrack)}
                  onMouseDown={handleMouseDown}
                >
                  <div
                    className={clsx(styles.progress)}
                    style={{ width: `${progress}%` }}
                  >
                    <div className={clsx(styles.progressThumb)}></div>
                  </div>
                </div>
                <span className={clsx(styles.totalTime)}>{formatTime(currentSong.duration)}</span>
              </div>
              <div className={clsx(styles.control)}>
                <button className={clsx(styles.btn)} onClick={() => setIsShuffled(!isShuffled)}>
                  <i className="fa-solid fa-shuffle"></i>
                </button>
                <button className={clsx(styles.btn)} onClick={handlePrev}>
                  <i className="fa-solid fa-backward"></i>
                </button>
                <button className={clsx(styles.btn)} onClick={handlePlayPause}>
                  {isPlaying ? (
                    <i className="fa-solid fa-pause"></i>
                  ) : (
                    <i className="fa-solid fa-play"></i>
                  )}
                </button>
                <button className={clsx(styles.btn)} onClick={handleNext}>
                  <i className="fa-solid fa-forward"></i>
                </button>
                <button className={clsx(styles.btn)} onClick={() => setIsRepeated(!isRepeated)}>
                  <i className="fa-solid fa-repeat"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(styles.lyrics)}>
          <pre >{currentSong.lyrics?.join('\n') || 'No lyrics available'}</pre>
        </div>
      </div>
    </div>
  );
}

export default Disc;
