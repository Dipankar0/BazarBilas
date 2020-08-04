import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import PrivateRoute from './components/routing/PrivateRoute';
import Navbarr from './components/layout/Navbarr';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
//import Alert from './components/layout/Alert';

import AddProduct from './components/product/NewProduct';

import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import ProductList from './components/product/ProductList';
import Product from './components/product/Product';
import Cart from './components/Order/Cart';
import NewOrder from './components/Order/NewOrder';
import ConfirmOrder from './components/Order/ConfirmOrder';
import UpdateProduct from './components/product/UpdateProduct';
import Organic from './components/section/Organic';
import General from './components/section/General';
import TryUs from './components/section/TryUs';
import OrganicOrigin from './components/origin/OrganicOrigin';
import GeneralOrigin from './components/origin/GeneralOrigin';
import TryUsOrigin from './components/origin/TryUsOrigin';
import CreateOrigin from './components/origin/CreateOrigin';
import AllProcessingOrderList from './components/Order/AllProcessingOrderList';
import MyOrderList from './components/Order/MyOrderList';
import AllDeliveredOrderList from './components/Order/AllDeliveredOrderList';
import MyDeliveredOrderList from './components/Order/MyDeliveredOrderList';
import Home from './components/management/seller/Home';
import MyProfile from './components/dashboard/MyProfile';
import EditProfile from './components/dashboard/EditProfile';
import ExpressDelivery from './components/Order/ExpressDelivery';
import AllSentOrderList from './components/Order/AllSentOrderList';
import NormalDelivery from './components/Order/NormalDelivery';
import AllCanceledOrderList from './components/Order/AllCanceledOrderList';
import PasswordChange from './components/auth/PasswordChange';
import NewPrint from './components/layout/NewPrint';
import UpdateOrigin from './components/origin/UpdateOrigin';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbarr />
            <section className='container'>
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/organic' component={Organic} />
                <Route exact path='/general' component={General} />
                <Route exact path='/tryus' component={TryUs} />
                <Route
                  exact
                  path='/organic/origins'
                  component={OrganicOrigin}
                />
                <Route
                  exact
                  path='/general/origins'
                  component={GeneralOrigin}
                />
                <Route exact path='/tryus/origins' component={TryUsOrigin} />
                <Route exact path='/products/:id' component={ProductList} />
                <Route
                  exact
                  path='/products/productId/:id'
                  component={Product}
                />
                <PrivateRoute
                  exact
                  path='/mypasswordchange'
                  component={PasswordChange}
                />
                <PrivateRoute exact path='/myprofile' component={MyProfile} />
                <PrivateRoute
                  exact
                  path='/editprofile'
                  component={EditProfile}
                />
                <PrivateRoute exact path='/sellerhome' component={Home} />
                <PrivateRoute
                  exact
                  path='/createOrigin'
                  component={CreateOrigin}
                />
                <PrivateRoute
                  exact
                  path='/updateproduct/:id'
                  component={UpdateProduct}
                />
                <PrivateRoute
                  exact
                  path='/updateorigin/:id'
                  component={UpdateOrigin}
                />
                <PrivateRoute exact path='/addProduct' component={AddProduct} />
                <PrivateRoute exact path='/cart' component={Cart} />
                <PrivateRoute exact path='/newOrder' component={NewOrder} />
                <PrivateRoute
                  exact
                  path='/expressdelivery'
                  component={ExpressDelivery}
                />
                <PrivateRoute
                  exact
                  path='/idealdelivery'
                  component={NormalDelivery}
                />
                <PrivateRoute
                  exact
                  path='/orderconfirmation/:id'
                  component={ConfirmOrder}
                />
                <PrivateRoute
                  exact
                  path='/allprocessingorderlist'
                  component={AllProcessingOrderList}
                />
                <PrivateRoute
                  exact
                  path='/allsentorderlist'
                  component={AllSentOrderList}
                />
                <PrivateRoute
                  exact
                  path='/alldeliveredorderlist'
                  component={AllDeliveredOrderList}
                />
                <PrivateRoute
                  exact
                  path='/allcanceledorderlist'
                  component={AllCanceledOrderList}
                />
                <PrivateRoute
                  exact
                  path='/myorderlist'
                  component={MyOrderList}
                />
                <PrivateRoute
                  exact
                  path='/mydeliveredorderlist'
                  component={MyDeliveredOrderList}
                />
                <PrivateRoute exact path='/print/:id' component={NewPrint} />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </Provider>
      <div>
        <MessengerCustomerChat
          pageId='100747138359873'
          appId='3962567807118599'
        />
        ,
      </div>
    </Fragment>
  );
};

export default App;
