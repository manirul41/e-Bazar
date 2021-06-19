import { combineReducers } from '@reduxjs/toolkit';
import productsSlice from './components/Products/ProductsSlice';

const reducers = combineReducers({
    products: productsSlice.reducer,
});

// auth => it is accessable from view page as a state object e.g. state.auth
// const auth = useSelector((state) => state.auth);

export default reducers;
