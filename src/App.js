import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './pages/Home'
import Category from './pages/Category'
import Footer from './components/layout/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Itin from './pages/Itin'
import Admin from './pages/Admin'
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
              <Route path='/admin' component={Admin} />  
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
