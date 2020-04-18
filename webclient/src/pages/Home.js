import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import CategoriesHighlights from '../components/home/CategoriesHighlights.js';
import Carousel from '../components/Carousel.js';
import NotFound from './404.js';

class Home extends Component {
  state = {
    categories: [],
    highlights: [],
    isError: false
  };
  async componentDidMount() {
    try {
      let highlightsData = await axios.get('/api/highlights');
      let categoriesData = await axios.get('/api/categories');
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
          <CategoriesHighlights categories={this.state.categories} />
        </div>
        <div
          className="planAVisit center"
          style={{ paddingBottom: '70px', width: '100%' }}
        >
          <Link
            to="/itinerary"
            className="waves-effect waves-light btn btn-large"
          >
            Plan A Visit!
          </Link>
        </div>
      </div>
    ) : (
      <NotFound />
    );
  }
}

export default Home;
