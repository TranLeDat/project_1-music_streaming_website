
import { useEffect, useState, useRef } from 'react';
import styles from './FormCreate.module.scss';
import clsx from 'clsx';

import img from '../../../assets/img/login/share.png'

const uploads = [
    { id: 1, name: 'Chỉ mình tôi' },
    { id: 2, name: 'Công khai' },
  ];

function FormCreate(){
        const [checked, setChecked] = useState(2);
        const [audio, setAudio] = useState(null);
        const [thumbnail, setThumbnail] = useState(null);
        const [name, setName] = useState('');
        const [artist, setArtist] = useState('');
        const [musician, setMusician] = useState('');
        const [desc, setDesc] = useState('');
        const [songList, setSongList] = useState();
        
        const audioRef = useRef();
        const thumbnailRef = useRef();
        
        const handlePreviewAudio = (e) => {
            const file = e.target.files[0];
            if (file) {
            const audioUrl = URL.createObjectURL(file);
            setAudio({ file, preview: audioUrl });
            }
        };
        
        useEffect(() => {
            return () => {
            audio && URL.revokeObjectURL(audio.preview);
            };
        }, [audio]);
        
        const handlePreviewImg = (e) => {
            const file = e.target.files[0];
            if (file) {
            const imgUrl = URL.createObjectURL(file);
            setThumbnail({ file, preview: imgUrl });
            }
        };
        
        useEffect(() => {
            return () => {
            thumbnail && URL.revokeObjectURL(thumbnail.preview);
            };
        }, [thumbnail]);
        
        const getAudioDuration = (audioFile) => {
            return new Promise((resolve) => {
            const audioElement = new Audio(audioFile.preview);
            audioElement.onloadedmetadata = () => {
                const duration = Math.floor(audioElement.duration);
                const minute = Math.floor(duration / 60);
                const second = duration % 60;
                const formattedDuration = `${minute}:${second.toString().padStart(2, '0')}`;
                resolve(formattedDuration);
            };
            audioElement.onerror = () => {
                resolve('0:00');
            };
            });
        };
        
        const handleSubmit = async (e) => {
        
            e.preventDefault();
        
            if (!audio || !thumbnail || !name || !artist || !musician || !desc) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
            }
        
            
            let formattedDuration = '0:00';
            try {
            formattedDuration = await getAudioDuration(audio);
            } catch (error) {
            console.error('Lỗi khi lấy thời lượng audio:', error);
            }
        
            const newId = Date.now().toString();
            const today = new Date();
            const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${today.getFullYear()}`;
        
            const newSong = {
            id: newId,
            videos: [
                {
                audio: audio.preview,
                name,
                thumbnail: thumbnail.preview,
                artist,
                musician,
                desc,
                mode: uploads.find((upload) => upload.id === checked)?.name || 'Công khai',
                },
            ],
            status: 'Đã đăng tải',
            date: formattedDate,
            views: 0,
            comments: 0,
            duration: formattedDuration, 
            };
            alert('Đăng tải bài hát thành công!')
            
            
            setSongList((prevSongList) =>{
                const updateSongList = [newSong, ...prevSongList];
                console.log('Updated songList (inside callback):', updateSongList);
            return updateSongList;
            });
        
            setAudio(null);
            setThumbnail(null);
            setName('');
            setArtist('');
            setMusician('');
            setDesc('');
            setChecked(2);
        
            if(audioRef.current){
                audioRef.current.value = null;
            }
            if(thumbnailRef.current){
                thumbnailRef.current.value = null;
            }
            console.log('New song:', newSong);
            console.log('Updated songList:', songList);
        };
        useEffect(() => {
            console.log('SongList after state update:', songList);
        }, [songList]);
        
        const handleClear = (e) => {
            e.preventDefault();
            setAudio(null);
            setThumbnail(null);
            setName('');
            setArtist('');
            setMusician('');
            setDesc('');
            setChecked(2);
            if(audioRef.current){
                audioRef.current.value = null;
            }
            if(thumbnailRef.current){
                thumbnailRef.current.value = null;
            }
        };
    return(
        <>
            <div className={clsx(styles.formCreate)}>
                <h2 className={clsx(styles.title)}>Đăng tải bài hát mới</h2>
                <div className={clsx(styles.content)}>
                    <form className={clsx(styles.form)} onSubmit={handleSubmit}>
                        <div className={clsx(styles.content_left)}>
                            <div className={clsx(styles.frameAudio)}>
                                <label htmlFor='audio-upload' className={clsx(styles.uploadArea)}>
                                    <div className={clsx(styles.uploadIcon)}>
                                        <img src={img} alt="upload"  className={clsx(styles.img)}/>
                                    </div>
                                    <div className={clsx(styles.uploadText)}>
                                        Tải lên
                                        <br /><span>Kéo thả tệp vào đây</span>
                                    </div>
                                </label>
                                <input
                                    id="audio-upload"
                                    ref={audioRef}
                                    type="file"
                                    name="audio"
                                    accept="audio/*"
                                    className={clsx(styles.inputAudio)}
                                    onChange={handlePreviewAudio}
                                />
                                <br />
                                {audio && (
                                    <audio
                                    src={audio.preview}
                                    controls
                                    className={clsx(styles.audioPreview)}
                                    />
                                )}
                            </div>
                            <div className={clsx(styles.frameThumbnail)}>
                                <label htmlFor='thumbnail-upload' className={clsx(styles.uploadArea)}>
                                    <div className={clsx(styles.uploadIcon)}>
                                        <img src={img} alt="upload"  className={clsx(styles.img)}/>
                                    </div>
                                    <div className={clsx(styles.uploadText)}>
                                        Tải lên
                                        <span>Kéo thả tệp vào đây</span>
                                    </div>
                                </label>
                                <input
                                    id="thumbnail-upload"
                                    ref={thumbnailRef}
                                    type="file"
                                    name="thumbnail"
                                    accept="image/*"
                                    className={clsx(styles.inputThumbnail)}
                                    onChange={handlePreviewImg}
                                />
                                <br />
                                {thumbnail && (
                                    <img
                                    src={thumbnail.preview}
                                    alt="Thumbnail Preview"
                                    className={clsx(styles.thumbnailPreview)}
                                    
                                    />
                                )}
                            </div>
                            
                            <br />
                            <label className={clsx(styles.info)}>Đăng ở chế độ</label>
                            <br />
                            {uploads.map((upload) => (
                                <div key={upload.id} className={clsx(styles.radioItem)}>
                                    <input
                                        type="radio"
                                        className={clsx(styles.rdr)}
                                        onChange={() => setChecked(upload.id)}
                                        checked={checked === upload.id}
                                    />
                                    <span>{upload.name}</span>
                                    <br />
                                </div>
                            ))}
                            </div>
                            <div className={clsx(styles.content_right)}>
                            <label>Tên bài hát</label>
                            <br />
                            <input
                                type="text"
                                name="name"
                                value={name}
                                className={clsx(styles.inputName)}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <br />
                            <div className={clsx(styles.music)}>
                                <div>
                                <label>Ca sĩ</label>
                                <br />
                                <input
                                    type="text"
                                    name="artist"
                                    value={artist}
                                    className={clsx(styles.inputArtist)}
                                    onChange={(e) => setArtist(e.target.value)}
                                />
                                </div>
                                <div>
                                <label>Nhạc sĩ</label>
                                <br />
                                <input
                                    type="text"
                                    name="musician"
                                    value={musician}
                                    className={clsx(styles.inputMusician)}
                                    onChange={(e) => setMusician(e.target.value)}
                                />
                                </div>
                            </div>
                            <label>Mô tả</label>
                            <br />
                            <textarea
                                name="desc"
                                value={desc}
                                className={clsx(styles.desc)}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                            <div className={clsx(styles.button)}>
                                <button
                                type="button"
                                className={clsx(styles.btn, styles.btnDelete)}
                                onClick={handleClear}
                                >
                                Xóa tất cả
                                </button>
                                <button
                                type="submit"
                                className={clsx(styles.btn, styles.btnAdd)}
                                >
                                Tải lên
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>           
        </>
    )
}

export default FormCreate;