import clsx from 'clsx';
import styles from './Header.module.scss';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import debounce from 'lodash.debounce';
import searchApi from '../../../api/searchApi';
import queryString from 'query-string';

function Header() {
  const [input, setInput] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const fetchTracks = useMemo(() =>
    debounce(async (query) => {
      if (!query) return setOptions([]);

      setLoading(true);
      try {
        const res = await searchApi.getTrackByName({ query });
        const songs = res || [];
        setOptions(songs.map(song => ({
          id: song.id,
          title: song.title,
          artist: song.artist.name,
          cover: song.album.cover_small,
          full: song,
          duration: song.duration,
        })));
      } catch (error) {
        console.error('Search failed:', error);
        setOptions([]);
      }
      setLoading(false);
    }, 500), []);

  useEffect(() => {
    fetchTracks(input);
    return () => fetchTracks.cancel();
  }, [input, fetchTracks]);

  const handleSelect = (event, value) => {
    if (value && value.full) {
      const query = queryString.stringify({ songId: value.id, source: 'search' });
      navigate({
        pathname: '/disc',
        search: `?${query}`
      }, {
        state: { song: value.full } // 🔥 chỉ truyền 1 bài duy nhất
      });
      setInput('');
    }
  };

  return (
    <header className={clsx(styles.header)}>
      <div className={clsx(styles.previous)} onClick={handleBack}>
        <i className="fa-solid fa-circle-chevron-left"></i>
      </div>

      <div className={clsx(styles.searchBars)}>
        <Autocomplete
          freeSolo
          options={options}
          getOptionLabel={(option) => `${option.title} - ${option.artist}`}
          loading={loading}
          inputValue={input}
          onInputChange={(e, value) => setInput(value)}
          onChange={handleSelect}
          
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ backgroundColor: 'white', width: '40vw', '& .MuiInputBase-input': { fontSize: '16px', }, }}
              placeholder="What do you want to listen to?"
              fullWidth
              size="small"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress size={16} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id} style={{ position: 'relative' }}>
              <img src={option.cover} alt="" width={30} height={30} style={{ marginRight: 8 }} />
              <span>{option.title} - <i>{option.artist}</i></span>
              <span style={{ position: 'absolute', top: '20%', right: '10px' }}>{formatTime(option.duration)}</span>
            </li>
          )}
        />
      </div>

      <div className={clsx(styles.notification)}>
        <i className="fa-solid fa-bell"></i>
      </div>
    </header>
  );
}

export default Header;
