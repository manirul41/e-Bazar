/* eslint-disable prettier/prettier */
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import cartAction from '../../Cart/CartAction';
import useStyles from './styles';

const { addToCartAction } = cartAction;

const Product = ({ product }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleAddToCart = () => dispatch(addToCartAction(product.id, 1))

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.media.source} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="body1" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="subtitle2">{product.price.formatted_with_symbol}</Typography>
                </div>
                {/* <Typography dangerouslySetInnerHTML={{__html: product.description.substring(0,50)}} variant="body2" color="textSecondary"/> */}
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;
