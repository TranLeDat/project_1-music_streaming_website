import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // 🎯 Import icon MUI

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
            variant="outlined"
            margin="normal"
            label={label}
            disabled={disable}
            error={!!hasError}
            helperText={errors[name]?.message}
            InputProps={{
              endAdornment: ( // 🎯 Gắn icon vào bên trong
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon sx={{ color: 'white' }} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                color: 'white',
              },
            }}
            InputLabelProps={{
              sx: {
                color: 'white',
                '&.Mui-focused': {
                  color: 'white',
                },
              },
            }}
            sx={{
              width: '250px',
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
