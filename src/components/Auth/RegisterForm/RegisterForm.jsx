import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Avatar, LinearProgress, Typography } from '@mui/material';
import {  LockOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Field from '../../form-control/field/Field';
import PasswordField from '../../form-control/passwordField/PasswordFiled';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,

};

function RegisterForm(props){

    const schema = yup.object().shape({
        fullName: yup.string().required('Please enter full name.').test('should-have-at-least-two-words','Please enter at least two words.',(value) => {
              if (!value) return false;
              return value.trim().split(' ').filter(word => word).length >= 2;
            }),
        email: yup.string().required('Please enter your email.').email('Please enter a valid email address.'),
        password: yup.string().required('Please enter your password.').min(8, 'Please enter at least 8 charaters.'),
        retypePassword: yup.string().required('Please retype your password.').oneOf([yup.ref('password')], 'Password does not match')    
      });
      

    const form = useForm({
        defaultValues :{
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
        mode: 'all'
    });

    const handleSubmit = async (values) => {
        
        const { onSubmit } = props;
        if (onSubmit){
            await onSubmit(values);
        } 
        
    };
    
    const {isSubmitting} = form.formState;

    return(
        <>
            <Box sx={{pt: 4,fontSize: '16px', display: 'flex', flexDirection: "column", position: 'relative'}} >
                {isSubmitting && <LinearProgress sx={{position: 'absolute', top: 1, left: 0, right: 0}} />}
                <Avatar sx={{m: '0 auto', backgroundColor: 'secondary.main'}}>
                    <LockOutlined ></LockOutlined>  
                </Avatar>
                <Typography sx={{textAlign:'center', mb: 3 ,fontSize: '16px',}} component="h3" variant='h5'>
                    Create an account
                </Typography>

                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <Field name='fullName' label='Full Name' form={form}/>
                    <Field name='email' label='Email' form={form}/>
                    <PasswordField name='password' label='Password' form={form}/>
                    <PasswordField name='retypePassword' label='Retype Password' form={form}/>

                    <Button disabled={isSubmitting} type='submit' 
                        sx={{mt: 3, mb: 2, fontSize: '16px',}} 
                        variant="contained" color="primary" 
                        fullWidth size='small' 
                    >
                        Create an account
                    </Button>
                </form> 
            </Box>
        </>
    )
}

export default RegisterForm;