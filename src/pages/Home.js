import React, { Component } from 'react';
import InterestingArea from '../components/home/InterestingArea.js';
import Carousel from '../components/Carousel.js';
import PlanAVisit from '../components/home/PlanAVisit.js';
import axios from 'axios';


class Home extends Component {
  state = {
    categories: []
  }
  async componentDidMount(){
    let {status, data} = await axios.get('/categories').catch(err => console.log(err));
    if(data){
      if(!data.message) return;
      this.setState({
        categories: data.message.length > 0 ? data.message : []
      })
    } else {
      console.log(`Error ${status} in loading /pages/category`)
    }
  }
  render() {
    return (
      <div className="Home">
        <Carousel />
        <div className="container area">
          <InterestingArea categories={this.state.categories} />
        </div>
        <PlanAVisit />
      </div>
    ) 
  }
}

export default Home;