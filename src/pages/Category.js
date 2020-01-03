import React, { Component } from 'react'
import '../index.css'
import '../css/area.css'
import axios from 'axios'
import CategoryDropdown from '../components/category/CategoryDropdown'
import CategoryPeople from '../components/category/CategoryPeople'
import Carousel from '../components/Carousel'
import Fourofour from './404'

class Category extends Component {
  state = {
    banners: [],
    reps: [],
    plans: [],
    isError: false,
  }

  async fetchCategoryData(){
    const slug = this.props.match.params.area
    try {
      let res = await axios.get(`/categories/${slug}`)
      console.log(res);
      let data = res.data
      this.setState({
        banners: data.message.banners,
        reps: data.message.representatives,
        plans: data.message.plans,
        isError: false,
      })
    } catch {
      this.setState({
        banners: [],
        reps: [],
        plans: [],
        isError: true,
      })
    }
  }

  componentDidMount(){
    this.fetchCategoryData();
  }  

  componentDidUpdate(prevProps){
    if(prevProps.match.params.area !== this.props.match.params.area){
      this.fetchCategoryData();
    }
  }
  
  render() {
    return !this.state.isError ? (
      <div className="container area">        
        <Carousel banners={this.state.banners}/>
        <CategoryDropdown plans={this.state.plans} slug={this.props.match.params.area}/>
        <CategoryPeople reps={this.state.reps}/>
      </div> 
    ) : ( <Fourofour />)
  }
}

export default Category
