import commerce from '../../lib/commerce';
import navSlice from './NavSlice';

const { actions: navbar } = navSlice;

const addToCartAction = (productId, quantity) => async (dispatch) => {
    const item = await commerce.cart.add(productId, quantity);
    dispatch(navbar.setCart(item.cart));
};

const fatchCartAction = () => async (dispatch) => {
    const cart = await commerce.cart.retrieve();
    dispatch(navbar.getCart(cart));
};

const navAction = { addToCartAction, fatchCartAction };

export default navAction;
