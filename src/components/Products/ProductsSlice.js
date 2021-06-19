import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        cart: [],
        status: null,
    },
    reducers: {
        getProducts: (state, action) => {
            state.status = 'successfull';
            state.list = action.payload;
        },
    },
});

export const { getProducts } = productsSlice.actions;
export default productsSlice;
