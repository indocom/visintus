import React, { Component } from 'react'
import '../index.css'
import '../css/area.css'
import axios from 'axios'
import CategoryDropdown from '../components/category/CategoryDropdown'
import CategoryPeople from '../components/category/CategoryPeople'
import Carousel from '../components/Carousel'

class Category extends Component {
  state = {
    banners: null,
    reps: null,
    plans: null
    // [{
    //   "_id": 1,
    //   "name": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    //   "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    // }]
  }

  async fetchCategoryData(){
    const slug = this.props.match.params.area
    let { data, status } = await axios.get(`/categories/${slug}`).catch(err => console.log(err));
    if(data){
      if(!data.message){
        this.setState({
          banners: '',
          reps: '',
          plans: '',
        })
      } else {
        this.setState({
          banners: data.message.banners || null,
          reps: data.message.representatives || null,
          plans: data.message.plans || null,
        })
      }
    } else {
      console.log(`Error ${status} in loading /pages/category`)
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
    return (
      <div className="container area">        
        <Carousel banners={this.state.banners}/>
        <CategoryDropdown plans={this.state.plans} slug={this.props.match.params.area} />
        <CategoryPeople reps={this.state.reps}/>
      </div> 
    )
  }
}            

export default Category;
