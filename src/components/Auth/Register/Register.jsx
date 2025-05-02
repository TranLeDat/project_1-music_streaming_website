import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm/RegisterForm';
import  { useDispatch } from 'react-redux'
import { register } from '../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

Register.propTypes = {
  
};

function Register() {

    const dispatch = useDispatch();

    const handleSubmit = async (values) =>{
        try {
            const action = register(values)
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            console.log('New user: ', user);
        } catch (error) {
            console.log('Failed to register', error);
        }
    } 

  return (
    <>
      <RegisterForm onSubmit={handleSubmit} />
    </>
  );
}

export default Register;