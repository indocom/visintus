import React, { Component } from 'react'
import '../index.css'
import '../css/area.css'
import AreaDropdown from '../components/area/AreaDropdown'
import AreaPeople from '../components/area/AreaPeople'
import Carousel from '../components/Carousel'

class Area extends Component {
  state = {
    pics: [],
    people: [],
    posts: []
  }
  async componentDidMount(){
    let photos = await (await fetch('https://jsonplaceholder.typicode.com/photos')).json();
    let users = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
    let posts = await( await fetch('https://jsonplaceholder.typicode.com/posts')).json();
    this.setState({
      pics: photos.slice(0,5),
      people: users.slice(0,4),
      posts: posts.slice(0,7)
    })
  }
  render() {
    console.log(this.state);
    return (
      <div className="container area">        
        <Carousel pics={this.state.pics}/>
        <AreaDropdown />
        <AreaPeople />
      </div> 
    )
  }
}

            

export default Area;
