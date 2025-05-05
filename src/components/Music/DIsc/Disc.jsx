import clsx from 'clsx';
import styles from './Disc.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRecentSong } from '../../../store/recentSlice';
import { setCurrentSong, setPlaylist } from '../../../store/playSlice';

function Disc() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { song, songList } = location.state || {};

  // Chuẩn hóa danh sách bài hát
  const normalizedSongs = (songList || []).map((item) => ({
    id: item.id,
    title: item.title || 'Unknown Title',
    artist: typeof item.artist === 'object' ? item.artist.name : item.artist || 'Unknown Artist',
    img:
      (item.album && item.album.cover_medium) ||
      item.img ||
      'https://via.placeholder.com/150',
    src: item.src || item.preview || '',
    duration: item.duration || 0,
    lyrics: item.lyrics || [''],
  }));

  const [songs] = useState(normalizedSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(() => {
    if (!song) return 0;
    const index = normalizedSongs.findIndex((s) => s.id === song.id);
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
    }
  }, [currentSongIndex]);

  useEffect(() => {
    if (song && songList.length > 0) {
      dispatch(setCurrentSong(currentSong));
      dispatch(setPlaylist(songs));
    }
  }, [dispatch, song, songList]);

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
    const handleEnded = () => {
      if (isRepeated) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        handleNext();
      }
    };
    const audio = audioRef.current;
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
                <h3>{currentSong.title}</h3>
                <p>{currentSong.artist}</p>
              </div>
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className={clsx(styles.controls)}>
              <audio ref={audioRef} src={currentSong.src || ''} />
              <div className={clsx(styles.progressWrapper)} ref={progressRef}>
                <span>{formatTime(currentTime)}</span>
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
                <span>{formatTime(currentSong.duration)}</span>
              </div>
              <div className={clsx(styles.control)}>
                <button onClick={() => setIsShuffled(!isShuffled)}>
                  <i className="fa-solid fa-shuffle"></i>
                </button>
                <button onClick={handlePrev}>
                  <i className="fa-solid fa-backward"></i>
                </button>
                <button onClick={handlePlayPause}>
                  {isPlaying ? (
                    <i className="fa-solid fa-pause"></i>
                  ) : (
                    <i className="fa-solid fa-play"></i>
                  )}
                </button>
                <button onClick={handleNext}>
                  <i className="fa-solid fa-forward"></i>
                </button>
                <button onClick={() => setIsRepeated(!isRepeated)}>
                  <i className="fa-solid fa-repeat"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(styles.lyrics)}>
          <pre>{currentSong.lyrics?.join('\n') || 'No lyrics available'}</pre>
        </div>
      </div>
    </div>
  );
}

export default Disc;
