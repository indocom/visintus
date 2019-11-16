import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Area from './components/area/Area'
import Footer from './components/layout/Footer'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/a/:area' component={Area} /> 
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />    
          </Switch>
          <Footer /> 
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
