import React, { Component } from 'react';
import axios from 'axios';

import InterestingArea from '../components/home/InterestingArea.js';
import Carousel from '../components/Carousel.js';
import PlanAVisit from '../components/home/PlanAVisit.js';
import NotFound from './404.js';

class Home extends Component {
  state = {
    categories: [],
    isError: false
  };
  async componentDidMount() {
    try {
      let res = await axios.get('/categories');
      let data = res.data;
      this.setState({
        categories: data.message.length > 0 ? data.message : [],
        isError: false
      });
    } catch {
      this.setState({
        categories: [],
        isError: true
      });
    }
  }
  render() {
    return !this.state.isError ? (
      <div className="Home">
        <Carousel banners={[]} />
        <div className="container area">
          <InterestingArea categories={this.state.categories} />
        </div>
        <PlanAVisit />
      </div>
    ) : (
      <NotFound />
    );
  }
}

export default Home;
