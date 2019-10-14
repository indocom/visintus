import React, { Component } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Area from './components/Area'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/a/' component={Area} />           
          </Switch> 
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
