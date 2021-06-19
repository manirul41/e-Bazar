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
import useStyles from './styles';

const Product = ({ product }) => {
    const classes = useStyles();
    console.log(product);
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
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;
