/* eslint-disable react/jsx-props-no-spreading */
import { Grid, TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';

const FormInput = ({ name, label, required }) => {
    const isError = false;

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                name={name}
                error={isError}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        variant="outlined"
                        margin="normal"
                        required={required}
                        fullWidth
                        id={name}
                        name={name}
                        label={label}
                        autoComplete={name}
                        // autoFocus
                        error={!!error}
                    />
                )}
            />
        </Grid>
    );
};

export default FormInput;
