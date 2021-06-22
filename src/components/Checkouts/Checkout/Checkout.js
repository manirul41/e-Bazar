import {
    Button,
    CircularProgress,
    Divider,
    Paper,
    Step,
    StepLabel,
    Stepper,
    // eslint-disable-next-line prettier/prettier
    Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import commerce from '../../../lib/commerce';
import cartAction from '../../Cart/CartAction';
import AddressForm from '../AddressForm';
import checkoutAction from '../CheckoutAction';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

const { fatchGenerateToken } = checkoutAction;
const { fatchCartAction } = cartAction;

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [order, setOrder] = useState({});

    const cart = useSelector((state) => state.cartItems.cart);
    const token = useSelector((state) => state.checkouts.token);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    // const order = useSelector((state) => state.checkouts.getCaptureCheckout);
    const refreshCart = async () => {
        await commerce.cart.refresh();
        dispatch(fatchCartAction());
    };

    const fatchToken = () => dispatch(fatchGenerateToken(cart.id));
    const onCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);

            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    };

    useEffect(() => {
        if (cart.id) fatchToken();
    }, [cart]);

    const test = (data) => {
        setShippingData(data);

        nextStep();
    };

    let Confirmation = () =>
        order.customer ? (
            <>
                <div>
                    <Typography variant="h5">
                        Thank you for your purchase, {order.customer.firstname}{' '}
                        {order.customer.lastname}!
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="subtitle2">
                        Order ref: {order.customer_reference}
                    </Typography>
                </div>
                <br />
                <Button component={Link} variant="outlined" type="button" to="/">
                    Back to home
                </Button>
            </>
        ) : (
            <div className={classes.spinner}>
                <CircularProgress />
            </div>
        );

    if (errorMessage) {
        Confirmation = () => (
            <>
                <Typography variant="h5">Error: {errorMessage}</Typography>
                <br />
                <Button component={Link} variant="outlined" type="button" to="/">
                    Back to home
                </Button>
            </>
        );
    }

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm
                checkoutToken={token}
                nextStep={nextStep}
                setShippingData={setShippingData}
                test={test}
            />
        ) : (
            <PaymentForm
                checkoutToken={token}
                nextStep={nextStep}
                backStep={backStep}
                shippingData={shippingData}
                onCaptureCheckout={onCaptureCheckout}
                error={errorMessage}
            />
        );
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
