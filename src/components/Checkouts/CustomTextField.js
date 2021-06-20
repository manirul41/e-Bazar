/* eslint-disable react/jsx-props-no-spreading */
import { Grid, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const FormInput = ({ name, label, required }) => {
    const { control } = useForm();
    const isError = false;

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                name={name}
                control={control}
                error={isError}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        variant="outlined"
                        margin="normal"
                        required={required}
                        fullWidth
                        id={name}
                        label={label}
                        autoComplete={name}
                        // autoFocus
                        error={!!error}
                    />
                )}
                rules={{
                    required: 'Required',
                }}
            />
        </Grid>
    );
};

export default FormInput;
