import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressForm from '../AddressForm';
import checkoutAction from '../CheckoutAction';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

const { fatchGenerateToken } = checkoutAction;

const steps = ['Shipping address', 'Payment details'];

const Confirmation = () => {
    <div>Confirmation</div>;
};

const Checkout = () => {
    const [activeStep] = useState(0);
    const classes = useStyles();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartItems.cart);
    const token = useSelector((state) => state.checkouts.token);
    // console.log(cart);
    const fatchToken = () => dispatch(fatchGenerateToken(cart.id));

    useEffect(() => {
        if (cart.id) fatchToken();
    }, [cart]);

    const Form = () => (activeStep === 0 ? <AddressForm checkoutToken={token} /> : <PaymentForm />);
    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : token.id && <Form />}
                </Paper>
            </main>
        </>
    );
};

export default Checkout;
