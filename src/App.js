import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Cart, Checkout, NavBar, Products } from './components';

function App() {
    return (
        <Router>
            <CssBaseline />
            <NavBar />
            <Switch>
                <Route exact path="/" component={Products} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/checkout" component={Checkout} />
            </Switch>
        </Router>
    );
}

export default App;
