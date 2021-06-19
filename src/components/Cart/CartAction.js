import commerce from '../../lib/commerce';
import cartSlice from './CartSlice';

const { actions: cart } = cartSlice;

const addToCartAction = (productId, quantity) => async (dispatch) => {
    const item = await commerce.cart.add(productId, quantity);
    dispatch(cart.setCart(item.cart));
};

const fatchCartAction = () => async (dispatch) => {
    const cartItem = await commerce.cart.retrieve();
    dispatch(cart.getCart(cartItem));
};

const onUpdateCartQty = (lineItemId, quantity) => async (dispatch) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    dispatch(cart.getCart(response.cart));
};

const onRemoveFromCart = (lineItemId) => async (dispatch) => {
    const response = await commerce.cart.remove(lineItemId);
    dispatch(cart.getCart(response.cart));
};

const onEmptyCart = () => async (dispatch) => {
    const response = await commerce.cart.empty();
    dispatch(cart.getCart(response.cart));
};

const cartAction = {
    addToCartAction,
    fatchCartAction,
    onUpdateCartQty,
    onRemoveFromCart,
    onEmptyCart,
};

export default cartAction;
