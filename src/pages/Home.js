import React, { Component } from 'react';
import axios from 'axios';

import InterestingArea from '../components/home/InterestingArea.js';
import Carousel from '../components/Carousel.js';
import PlanAVisit from '../components/home/PlanAVisit.js';
import NotFound from './404.js';

class Home extends Component {
  state = {
    categories: [],
    highlights: [],
    isError: false
  };
  async componentDidMount() {
    try {
      let highlightsData = await axios.get('/highlights');
      let categoriesData = await axios.get('/categories');
      highlightsData = highlightsData.data;
      categoriesData = categoriesData.data;
      this.setState({
        highlights:
          highlightsData.message.length > 0 ? highlightsData.message : [],
        categories:
          categoriesData.message.length > 0 ? categoriesData.message : [],
        isError: false
      });
    } catch {
      this.setState({
        highlights: [],
        categories: [],
        isError: true
      });
    }
  }
  render() {
    return !this.state.isError ? (
      <div className="Home">
        <Carousel banners={this.state.highlights} />
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
