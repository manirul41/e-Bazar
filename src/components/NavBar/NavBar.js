import { AppBar, Badge, IconButton, Toolbar, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/commerce.png';
import cartAction from '../Cart/CartAction';
import useStyles from './styles';

const { fatchCartAction } = cartAction;

const NavBar = () => {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cartItems);

    const fatchCart = () => dispatch(fatchCartAction());

    useEffect(() => {
        fatchCart();
    }, []);

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography
                        component={Link}
                        to="/"
                        variant="h6"
                        className={classes.title}
                        color="inherit"
                    >
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                        e-Bazar
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                        <div className={classes.button}>
                            <IconButton
                                component={Link}
                                to="/cart"
                                aria-label="Show cart items"
                                color="inherit"
                            >
                                <Badge badgeContent={cartItems.cart.total_items} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavBar;
