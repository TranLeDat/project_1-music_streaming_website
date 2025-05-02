
import clsx from "clsx";
import styles from './Login.module.scss'
import google from '../../assets/img/login/chrome.png'
import facebook from '../../assets/img/login/Vector.png'
import zalo from '../../assets/img/login/zalo.png'
import apple from '../../assets/img/login/apple.png'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import { Button } from "@mui/material";
import Register from "../Auth/Register/Register";



function Login(){


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return(
        <>
            <div className={clsx(styles.frame)}>
                <h2 className={clsx(styles.title)}>Đăng nhập vào WOZZ</h2>
                <ul className={clsx(styles.items)}>
                    <li className={clsx(styles.item)} >
                        <button className={clsx(styles.btn, styles.btnGoogle)} >
                            <img src={google} alt='google' className={clsx(styles.icon)}/>
                            <p className={clsx(styles.name, styles.named)}>Đăng nhập với Google</p>
                        </button>
                    </li>
                    <li className={clsx(styles.item)} >
                        <button className={clsx(styles.btn, styles.btnFacebook)} >
                            <img src={facebook} alt='facebook' className={clsx(styles.icon)}/>
                            <p className={clsx(styles.name)}>Đăng nhập với Facebook</p>
                        </button>
                    </li>
                    <li className={clsx(styles.item)} >
                        <button className={clsx(styles.btn, styles.btnZalo)} >
                            <img src={zalo} alt='zalo' className={clsx(styles.icon)}/>
                            <p className={clsx(styles.name)}>Đăng nhập với Zalo</p>
                        </button>
                    </li>
                    <li className={clsx(styles.item)} >
                        <button className={clsx(styles.btn, styles.btnApple)} >
                            <img src={apple} alt='apple' className={clsx(styles.icon)}/>
                            <p className={clsx(styles.name)}>Đăng nhập với Apple</p>
                        </button>
                    </li>
                </ul>
                <div className={clsx(styles.signinForm)}>
                    <button onClick={handleClickOpen} className={clsx(styles.signinbtn)} >Register</button>
                    
                </div>
            </div>
            <Dialog
                open={open}
                onClose={(e, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    handleClose();
                    }
                }}
                
                >
                <DialogContent sx={{ flex: 1 }}>
                    <Register/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
                </Dialog>

        </>
    )
}

export default Login;