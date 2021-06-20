import { combineReducers } from '@reduxjs/toolkit';
import cartSlice from './components/Cart/CartSlice';
import checkoutSlice from './components/Checkouts/CheckoutSlice';
import navSlice from './components/NavBar/NavSlice';
import productsSlice from './components/Products/ProductsSlice';

const reducers = combineReducers({
    products: productsSlice.reducer,
    nav: navSlice.reducer,
    cartItems: cartSlice.reducer,
    checkouts: checkoutSlice.reducer,
});

// auth => it is accessable from view page as a state object e.g. state.auth
// const auth = useSelector((state) => state.auth);

export default reducers;
