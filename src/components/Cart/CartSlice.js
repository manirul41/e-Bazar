import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        status: null,
    },
    reducers: {
        setCart: (state, action) => {
            state.status = 'successfull';
            state.cart = action.payload;
        },
        getCart: (state, action) => {
            state.status = 'successfull';
            state.cart = action.payload;
        },
    },
});

export const { setCart, getCart } = cartSlice.actions;
export default cartSlice;
