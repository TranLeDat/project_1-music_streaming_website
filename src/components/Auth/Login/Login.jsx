import React from 'react';
import PropTypes from 'prop-types';
// import  { useDispatch } from 'react-redux'
// import { login } from '../userSlice';
// import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import LoginForm from '../LoginForm/LoginForm';
import { useAuth } from '../../AuthContext/AuthContext';


Login.propTypes = {
  
};

function Login({ onClose }) {
  const { login: loginContext } = useAuth();


    // const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar()

    const handleSubmit = async (values) =>{
        try {
            // const action = login(values)
            // const resultAction = await dispatch(action);
            // const user = unwrapResult(resultAction);
            
            // enqueueSnackbar('Login successfully!', { variant: 'success' });
            alert('Login successfully');
            loginContext(); // gọi sau khi show thông báo
            onClose?.();
            console.log('user:', values);
        } catch (error) {
          console.log('Login error:', error);
          enqueueSnackbar('Login failed!!!', { variant: 'error' });
        }
    } 

  return (
    <>
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
}

export default Login;