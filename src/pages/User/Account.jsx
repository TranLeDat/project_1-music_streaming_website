import clsx from "clsx";
import styles from './Account.module.scss'

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import { Button } from "@mui/material";
import Register from "../../components/Auth/Register/Register";

function Account(){

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
                <h1 className={clsx(styles.title)}>Đăng nhập WOZZ để có thể sử dụng tính năng này </h1>
                    <button onClick={handleClickOpen} className={clsx(styles.btn)} >Đăng kí ngay</button>
                    <button  className={clsx(styles.btn)} >Đăng nhập ngay</button>
            </div> 
            <Dialog
                open={open}
                onClose={(e, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    handleClose();
                    }
                }}
                slotProps={{
                    paper: {
                        sx: {
                            height: 550,
                            display: 'flex',
                            gap: '20px',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: 2,
                        },
                    },
                  }}
                
                >
                <DialogContent sx={{ flex: 1, fontSize: '0.85rem'  }}>
                    <Register/>
                </DialogContent>
                <DialogActions>
                    <Button sx={{fontSize: '14px'}} onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>                          
        </>
    )
}

export default Account;