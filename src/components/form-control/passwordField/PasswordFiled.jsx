import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField({ form, name, label, disabled }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    formState: { errors },
  } = form;

  const hasError = !!errors[name];

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  return (
    <FormControl
      fullWidth
      margin="normal"
      variant="outlined"
      error={hasError}
    >
      <InputLabel htmlFor={name} sx={{ fontSize: '16px' }}>
        {label}
      </InputLabel>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            id={name}
            type={showPassword ? 'text' : 'password'}
            margin="dense"
            size="small"
            label={label}
            disabled={disabled}
            sx={{ fontSize: '16px' }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={toggleShowPassword}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        )}
      />

      <FormHelperText sx={{ fontSize: '12px' }}>
        {errors[name]?.message}
      </FormHelperText>
    </FormControl>
  );
}

export default PasswordField;
