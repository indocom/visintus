import React, { Component } from 'react';
import M from 'materialize-css';
import InterestingArea from '../components/home/InterestingArea.js';
import Carousel from '../components/Carousel.js';
import PlanAVisit from '../components/home/PlanAVisit.js';


class Home extends Component {
    render() {
      return (
        <div className="Home">
          <Carousel />
          <div className="container area">
            <InterestingArea />
          </div>
          <PlanAVisit />
        </div>
      ) 
    }
}
            

export default Home;