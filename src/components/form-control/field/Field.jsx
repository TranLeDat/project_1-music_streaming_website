import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField, InputAdornment, IconButton } from '@mui/material';

Field.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disable: PropTypes.bool,
};

function Field({ form, name, label, disable }) {
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
            margin="dense"
            size='small'
            label={label}
            disabled={disable}
            error={!!hasError}
            helperText={errors[name]?.message}
            InputProps={{
              sx: { fontSize: '16px' } // Tăng kích thước chữ nhập vào
            }}
            InputLabelProps={{
              sx: { fontSize: '16px' } // Tăng kích thước chữ nhãn (label)
            }}
             FormHelperTextProps={{
              sx: { fontSize: '12px', color: 'red' } // Font size và màu cho validate message
            }}
          />
        )}
      />
    </>
  );
}

export default Field;
