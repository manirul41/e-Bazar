import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product/Product';
import productAction from './ProductsAction';
import useStyles from './styles';

const { getProductsAction } = productAction;

const Products = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProductsAction);
    }, [dispatch]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.status === 'successfull' &&
                    products.list.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Product product={product} />
                        </Grid>
                    ))}
            </Grid>
        </main>
    );
};

export default Products;
