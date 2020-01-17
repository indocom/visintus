import React, { Component } from 'react';
import axios from 'axios';

import CategoryDropdown from '../components/category/CategoryDropdown';
import CategoryPeople from '../components/category/CategoryPeople';
import Carousel from '../components/Carousel';
import NotFound from './404';

import '../index.css';
import '../css/area.css';

class Category extends Component {
  state = {
    banners: [],
    plans: [],
    reps: [],
    isError: false
  };

  async fetchCategoryData() {
    const slug = this.props.match.params.slug;
    try {
      let res = await axios.get(`/categories/${slug}`);
      console.log(res);
      let data = res.data;
      this.setState({
        banners: data.message.banners,
        plans: data.message.plans,
        reps: data.message.representatives,
        isError: false
      });
    } catch {
      this.setState({
        banners: [],
        plans: [],
        reps: [],
        isError: true
      });
    }
  }

  componentDidMount() {
    this.fetchCategoryData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.slug !== this.props.match.params.slug) {
      this.fetchCategoryData();
    }
  }

  render() {
    return !this.state.isError ? (
      <div className="container area">
        <Carousel banners={this.state.banners} />
        <CategoryDropdown
          plans={this.state.plans}
          slug={this.props.match.params.slug}
        />
        <CategoryPeople reps={this.state.reps} />
      </div>
    ) : (
      <NotFound />
    );
  }
}

export default Category;
