import commerce from '../../lib/commerce';
import cartSlice from '../Cart/CartSlice';
import checkoutSlice from './CheckoutSlice';

const { actions: cart } = cartSlice;

const { actions: checkout } = checkoutSlice;

const fatchGenerateToken = (cartId) => async (dispatch) => {
    const token = await commerce.checkout.generateToken(cartId, { type: 'cart' });
    dispatch(checkout.getToken(token));
};

const fetchShippingCountries = (checkoutTokenId) => async (dispatch) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    return dispatch(checkout.getCountries(countries));
};

const fetchSubdivisions = (countryCode) => async (dispatch) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    return dispatch(checkout.getSubdivisions(subdivisions));
};

const fetchShippingOptions =
    (checkoutTokenId, country, stateProvince = null) =>
    async (dispatch) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {
            country,
            region: stateProvince,
        });
        return dispatch(checkout.getShippingOptions(options));
    };

const fatchCaptureCheckout = (checkoutTokenId, newOrder) => async (dispatch) => {
    const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
    dispatch(checkout.getCaptureCheckout(incomingOrder));
    const newCart = await commerce.cart.refresh();
    dispatch(cart.getCart(newCart));
};

const checkoutAction = {
    fatchGenerateToken,
    fetchShippingCountries,
    fetchSubdivisions,
    fetchShippingOptions,
    fatchCaptureCheckout,
};

export default checkoutAction;
