import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Category from './pages/Category';
import Footer from './components/layout/Footer';
import Itinerary from './pages/Itinerary';
import { Dashboard } from './pages/Admin';
import Checkout from './pages/Checkout';
import NotFound from './pages/404';
import {
  Verify,
  ForgotPassword,
  ResetPassword,
  Login,
  Signup
} from './pages/users';
import * as url from '~/constants/url';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="main-container grey lighten-4">
            <Switch>
              <Route exact path={url.HOME} component={Home} />
              <Route path={url.CATEGORIES} component={Category} />
              <Route path={url.LOGIN} component={Login} />
              <Route path={url.SIGNUP} component={Signup} />
              <Route path={url.ITINERARY} component={Itinerary} />
              <Route path={url.CHECKOUT} component={Checkout} />
              <Route path={url.ADMIN} component={Dashboard} />
              <Route path={url.VERIFY_ACC} component={Verify} />
              <Route
                exact
                path={url.RESET_PASSWORD}
                component={ResetPassword}
              />
              <Route path={url.FORGOT_PASSWORD} component={ForgotPassword} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
