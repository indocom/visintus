import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './pages/Home'
import Category from './pages/Category'
import Footer from './components/layout/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Itin from './pages/Itin'
import * as Admin from './pages/Admin'
import Checkout from './pages/Checkout'
// import reactAdmin from './pages/reactAdmin'


class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="main-container">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/category/:area' component={Category} /> 
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />  
              <Route path='/itin' component={Itin} />
              <Route path='/checkout' component={Checkout} />  
              <Route exact path='/admin' component={Admin.Dashboard} />  
              <Route exact path='/admin/categories' component={Admin.Components.Category} />  
              <Route exact path='/admin/banners' component={Admin.Components.Banner} />  
              <Route exact path='/admin/plans' component={Admin.Components.Plan} />  
              <Route exact path='/admin/reps' component={Admin.Components.Representative} />  
              {/* <Route path='/testadmin' component={reactAdmin} />   */}
            </Switch>
          </div>
          <Footer /> 
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
