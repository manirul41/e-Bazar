import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import carttAction from '../CartAction';
import useStyles from './styles';

const { onUpdateCartQty, onRemoveFromCart } = carttAction;

const CartItem = ({ item }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleUpdateCartQty = (lineItemId, newQuantity) =>
        dispatch(onUpdateCartQty(lineItemId, newQuantity));

    const handleRemoveFromCart = (lineItemId) => dispatch(onRemoveFromCart(lineItemId));

    return (
        <Card className="cart-item">
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button
                        type="button"
                        size="small"
                        disabled={item.quantity === 1}
                        onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
                    >
                        -
                    </Button>
                    <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
                    <Button
                        type="button"
                        size="small"
                        onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
                    >
                        +
                    </Button>
                </div>
                <Button
                    variant="contained"
                    type="button"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(item.id)}
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
};

export default CartItem;
