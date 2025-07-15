import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disable: PropTypes.bool,
};

function InputField({ form, name, label, disable }) {
  const {
    control,
    formState: { errors },
  } = form;
  const hasError = errors[name];

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            fontSize="2.4rem"
            variant="outlined"
            margin="normal"
            label={label}
            disabled={disable}
            error={!!hasError}
            helperText={errors[name]?.message}
            InputProps={{
              endAdornment: ( 
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon sx={{ color: 'white', fontSize: '28px' }} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                color: 'white',
                fontSize: '1.6rem',
              },
            }}
             FormHelperTextProps={{
              sx: {
                fontSize: '1.2rem',
                color: 'red',
              },
            }}
            InputLabelProps={{
              sx: {
                color: 'white',
                fontSize: '1.6rem',
                '&.Mui-focused': {
                  color: 'white',
                },
              },
            }}
            sx={{
              width: '400px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
            }}
          />
        )}
      />
    </>
  );
}

export default InputField;
