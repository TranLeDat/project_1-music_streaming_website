import clsx from "clsx";
import styles from './Account.module.scss';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState } from "react";
import { Box, Button } from "@mui/material";
import Register from "../../components/Auth/Register/Register";
import Login from "../../components/Auth/Login/Login"; 
import UserLogin from "../UserLogin/UserLogin";
import { useAuth } from "../../components/AuthContext/AuthContext";

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register'
};

function Account() {
    
    const { isLoggedIn } = useAuth();

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);

    const handleClickOpen = (type) => {
        setMode(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
          {!isLoggedIn ? (  
            <>
              <div className={clsx(styles.frame)}>
                <h1 className={clsx(styles.title)}>Đăng nhập WOZZ để có thể sử dụng tính năng này</h1>
                <button onClick={() => handleClickOpen(MODE.REGISTER)} className={clsx(styles.btn)}>Đăng kí ngay</button>
                <button onClick={() => handleClickOpen(MODE.LOGIN)} className={clsx(styles.btn)}>Đăng nhập ngay</button>
              </div>
              <Dialog open={open} onClose={handleClose}>
                <DialogContent sx={{ fontSize: '0.85rem', position: 'relative' }}>
                  {mode === MODE.REGISTER && (
                    <Box sx={{ height: 520, boxSizing: 'border-box' }}>
                      <Register />
                      <Box textAlign='center' sx={{ position: 'absolute', bottom: '0px' }}>
                        <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                          Already have an account? Login here
                        </Button>
                      </Box>
                    </Box>
                  )}
                  {mode === MODE.LOGIN && (
                    <Box sx={{ height: 350, boxSizing: 'border-box' }}>
                      <Login onClose={handleClose} />
                      <Box textAlign='center' sx={{ position: 'absolute', bottom: '0px' }}>
                        <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                          Don't have an account? Register here
                        </Button>
                      </Box>
                    </Box>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button sx={{ fontSize: '14px' }} onClick={handleClose}>Cancel</Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <div className={clsx(styles.logged)}>
              <UserLogin />
            </div>
          )}
        </>
      );
}      

export default Account;
