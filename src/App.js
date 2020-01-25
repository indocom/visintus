import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Category from './pages/Category';
import Footer from './components/layout/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Itinerary from './pages/Itin';
import { Dashboard } from './pages/Admin';
import Checkout from './pages/Checkout';
import NotFound from './pages/404';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="main-container grey lighten-4">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/categories/:slug" component={Category} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/itinerary" component={Itinerary} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/admin" component={Dashboard} />
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
