import { createSlice } from '@reduxjs/toolkit';

const navSlice = createSlice({
    name: 'navbar',
    initialState: {
        cart: [],
        status: null,
    },
    reducers: {},
});

export const { setCart, getCart } = navSlice.actions;
export default navSlice;
