import styles from './Individual.module.scss';
import clsx from 'clsx';
import { foryous } from '../../../foryou';
import VideoList from '../VideoList/VideoList';
import upload from '../../../assets/img/login/upload.png';
import { Link } from 'react-router-dom';

const subjects = ['Video', 'Trạng thái', 'Ngày', 'Lượt xem', 'Bình luận', 'Thời lượng'];

function Individual() {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.formShow)}>
                <h2 className={clsx(styles.title)}>Nội dung đã đăng tải</h2>
                <div className={clsx(styles.subjects)}>
                    <p className={clsx(styles.video)}>{subjects[0]}</p>
                    <p className={clsx(styles.status)}>{subjects[1]}</p>
                    <p className={clsx(styles.date)}>{subjects[2]}</p>
                    <p className={clsx(styles.views)}>{subjects[3]}</p>
                    <p className={clsx(styles.comments)}>{subjects[4]}</p>
                    <p className={clsx(styles.time)}>{subjects[5]}</p>
                </div>
                <div className={clsx(styles.videolist)}>
                    {foryous.map((song) => (
                        <VideoList key={song.id} song={song} videos={song.videos} />
                    ))}
                </div>
                <div>
                    <div className={clsx(styles.formCreate)}>
                        <img src={upload} alt="upload" className={clsx(styles.img)} />
                        <Link to="/foryou/formCreate" className={clsx(styles.btn)}>
                            <button className={clsx(styles.btnAdd)}>
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </Link>
                        <p className={clsx(styles.desc)}>Đăng tải bài hát mới</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Individual;