import React, { Component } from 'react'
import '../index.css'
import '../css/area.css'
import axios from 'axios'
import CategoryDropdown from '../components/category/CategoryDropdown'
import CategoryPeople from '../components/category/CategoryPeople'
import Carousel from '../components/Carousel'

class Category extends Component {
  state = {
    banners: [],
    reps: [],
    plans: [{
      "_id": 1,
      "name": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }]
  }

  // async componentDidMount(){
  //   let photos = await (await fetch('https://jsonplaceholder.typicode.com/photos')).json();
  //   let users = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
  //   let posts = await( await fetch('https://jsonplaceholder.typicode.com/posts')).json();
  //   this.setState({
  //     pics: photos.slice(0,5),
  //     reps: users.slice(0,4),
  //     plans: posts.slice(0,7)
  //   })
  // }

  async componentDidUpdate(){
    const slug = this.props.match.params.area
    let { data, status } = await axios.get(`/categories/${slug}`).catch(err => console.log(err));
    if(data){
      if(!data.message) return;
      this.setState({
        banners: data.message.banners || [],
        reps: data.message.representatives || [],
        plans: data.message.plans || [],
      })
    } else {
      console.log(`Error ${status} in loading /pages/category`)
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
