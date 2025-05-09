import React from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import  { useDispatch } from 'react-redux'
import { register } from '../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

Register.propTypes = {
  
};

function Register() {

    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar()

    const handleSubmit = async (values) =>{
        try {
            const action = register(values)
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            console.log('New user: ', user);
            enqueueSnackbar('Register successfully!!!', {variant: 'success'})
        } catch (error) {
            console.log('Failed to register', error);
            enqueueSnackbar('Register failed!!!', {variant: 'error'})
        }
    } 

  return (
    <>
      <RegisterForm onSubmit={handleSubmit} />
    </>
  );
}

export default Register;