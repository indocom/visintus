import React, { Component } from 'react'
import M from 'materialize-css'
import InterestingArea from './InterestingArea.js'
import HomeCarousel from './HomeCarousel.js'
import PlanAVisit from './PlanAVisit.js'
//import axios from 'axios'
//import { Link } from 'react-router-dom'

class Home extends Component {
    render() {
      return (
          <div className="container area">
            <HomeCarousel />
            <InterestingArea />
            <PlanAVisit />
          </div>
      ) 
    }
}
            

export default Home;