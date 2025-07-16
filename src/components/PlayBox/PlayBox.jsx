import styles from './PlayBox.module.scss';
import bgc from '../../assets/img/login/image-cache.jpg';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function PlayBox() {
  const audioRef = useRef();
  const progressRef = useRef();

  const currentSong = useSelector((state) => state.play.currentSong);
  const playlist = useSelector((state) => state.play.playlist);

  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (!currentSong || !playlist.length) return 0;
    const index = playlist.findIndex((s) => s.id === currentSong.id);
    return index !== -1 ? index : 0;
  });

  useEffect(() => {
    if (currentSong && playlist.length) {
      const index = playlist.findIndex((s) => s.id === currentSong.id);
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [currentSong, playlist]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (!isDragging && audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        setProgress(progressPercent);
        setCurrentTime(audio.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
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
  }, [isRepeated, currentIndex]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = progressRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    const audio = audioRef.current;
    audio.currentTime = (newProgress / 100) * audio.duration;
    setProgress(newProgress);
  };
  const handleMouseUp = () => setIsDragging(false);

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
    if (!audio.src) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!playlist.length) return;
    const nextIndex = isShuffled
      ? Math.floor(Math.random() * playlist.length)
      : (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    setProgress(0);
    setPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setPlaying(true);
    }, 100);
  };

  const handlePrev = () => {
    if (!playlist.length) return;
    const prevIndex = isShuffled
      ? Math.floor(Math.random() * playlist.length)
      : (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIndex);
    setProgress(0);
    setPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setPlaying(true);
    }, 100);
  };

  const handleShuffle = () => setIsShuffled(!isShuffled);
  const handleRepeat = () => setIsRepeated(!isRepeated);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const song = playlist[currentIndex] || {};

  return (
    <footer className={clsx(styles.playbox)}>
      <div className={clsx(styles.infos)}>
        <img
          src={song.img || song.albumArt || bgc}
          alt='album Art'
          className={clsx(styles.albumArt)}
        />
        <div className={clsx(styles.details)}>
          <h3 className={clsx(styles.title)}>{song.title || 'Tên bài hát'}</h3>
          <p className={clsx(styles.artist)}>{song.artist || 'Tên ca sĩ'}</p>
        </div>
      </div>
      <div className={clsx(styles.content)}>
        <div className={clsx(styles.controls)}>
          <button className={clsx(styles.controlBtn, { [styles.active]: isShuffled })} onClick={handleShuffle}>
            <i className="fa-solid fa-shuffle"></i>
          </button>
          <button className={clsx(styles.controlBtn)} onClick={handlePrev}>
            <i className="fa-solid fa-backward"></i>
          </button>
          <button className={clsx(styles.controlBtn, styles.playBtn)} onClick={handlePlayPause}>
            {isPlaying ? (
              <i className="fa-regular fa-circle-pause"></i>
            ) : (
              <i className="fa-regular fa-circle-play"></i>
            )}
          </button>
          <button className={clsx(styles.controlBtn)} onClick={handleNext}>
            <i className="fa-solid fa-forward"></i>
          </button>
          <button className={clsx(styles.controlBtn, { [styles.active]: isRepeated })} onClick={handleRepeat}>
            <i className="fa-solid fa-repeat"></i>
          </button>
        </div>

        <div className={clsx(styles.progressBtn)}>
          <div className={clsx(styles.timeDisplay)}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <audio ref={audioRef} src={song.src || ''} />
          <div
            className={clsx(styles.progressWrapper)}
            onMouseDown={handleMouseDown}
            ref={progressRef}
          >
            <div className={clsx(styles.progress)} style={{ width: `${progress}%` }}>
              <div className={clsx(styles.progressThumb)}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(styles.icon)}>
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </div>
    </footer>
  );
}

export default PlayBox;
