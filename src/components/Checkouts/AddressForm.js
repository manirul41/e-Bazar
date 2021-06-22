/* eslint-disable react/jsx-props-no-spreading */
import { Button, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import checkoutAction from './CheckoutAction';
import FormInput from './CustomTextField';

const { fetchShippingCountries, fetchSubdivisions, fetchShippingOptions } = checkoutAction;

const AddressForm = ({ checkoutToken, test }) => {
    // const token = useSelector((state) => state.checkouts.token);
    // const countries = useSelector((state) => state.checkouts.countries);
    // console.log(token);
    const dispatch = useDispatch();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            address1: '',
            email: '',
            city: '',
            zip: '',
        },
    });

    useEffect(() => {
        dispatch(fetchShippingCountries(checkoutToken.id)).then((res) => {
            setShippingCountries(res.payload);
            setShippingCountry(Object.keys(res.payload)[0]);
        });
    }, []);

    useEffect(() => {
        if (shippingCountry)
            dispatch(fetchSubdivisions(shippingCountry)).then((res) => {
                setShippingSubdivisions(res.payload);
                setShippingSubdivision(Object.keys(res.payload)[0]);
            });
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision)
            dispatch(
                fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
            ).then((res) => {
                setShippingOptions(res.payload);
                setShippingOption(res.payload[0].id);
            });
    }, [shippingSubdivision]);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit((data) => {
                        test({
                            ...data,
                            shippingCountry,
                            shippingSubdivision,
                            shippingOption,
                        });
                    })}
                >
                    <Grid container spacing={3}>
                        <FormInput required name="firstName" label="First name" />
                        <FormInput required name="lastName" label="Last name" />
                        <FormInput required name="address1" label="Address line 1" />
                        <FormInput required name="email" label="Email" />
                        <FormInput required name="city" label="City" />
                        <FormInput required name="zip" label="Zip / Postal code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select
                                value={shippingCountry}
                                fullWidth
                                onChange={(e) => setShippingCountry(e.target.value)}
                            >
                                {Object.entries(shippingCountries)
                                    .map(([code, name]) => ({ id: code, label: name }))
                                    .map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select
                                value={shippingSubdivision}
                                fullWidth
                                onChange={(e) => setShippingSubdivision(e.target.value)}
                            >
                                {Object.entries(shippingSubdivisions)
                                    .map(([code, name]) => ({ id: code, label: name }))
                                    .map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select
                                value={shippingOption}
                                fullWidth
                                onChange={(e) => setShippingOption(e.target.value)}
                            >
                                {shippingOptions
                                    .map((sO) => ({
                                        id: sO.id,
                                        label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                                    }))
                                    .map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} variant="outlined" to="/cart">
                            Back to Cart
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Next
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;
