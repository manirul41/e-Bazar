import commerce from '../../lib/commerce';
import productsSlice from './ProductsSlice';

const { actions: product } = productsSlice;

const getProductsAction = async (dispatch) => {
    const { data } = await commerce.products.list();
    dispatch(product.getProducts(data));
};
export default getProductsAction;
