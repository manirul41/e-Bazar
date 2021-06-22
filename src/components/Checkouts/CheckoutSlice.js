import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        token: [],
        countries: [],
        subdivisions: [],
        shippingOptions: [],
        captureCheckout: [],
        status: null,
    },
    reducers: {
        getToken: (state, action) => {
            state.status = 'successfull';
            state.token = action.payload;
        },
        getCountries: (state, action) => {
            state.status = 'successfull';
            state.countries = action.payload;
        },
        getSubdivisions: (state, action) => {
            state.status = 'successfull';
            state.subdivisions = action.payload;
        },
        getShippingOptions: (state, action) => {
            state.status = 'successfull';
            state.shippingOptions = action.payload;
        },
        getCaptureCheckout: (state, action) => {
            state.status = 'successfull';
            state.captureCheckout = action.payload;
        },
    },
});

export const { getToken, getCountries, getSubdivisions, shippingOptions, captureCheckout } =
    checkoutSlice.actions;
export default checkoutSlice;
