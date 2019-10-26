import React, { Component } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import Background1 from '../background1.jpg'
import People from './People'
import '../index.css'
import M from 'materialize-css'

class Area extends Component {
    state = {
        posts: [
          {
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
          },
          {
            "id": 2,
            "title": "qui est esse",
            "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
          },
          {
            "id": 3,
            "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
            "body": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
          },
          {
            "id": 4,
            "title": "eum et est occaecati",
            "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
          },
          {
            "id": 5,
            "title": "nesciunt quas odio",
            "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
          }]
    }
    
    /* 
    componentDidMount(){
        let id = this.props.match.params.post_id;
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
            .then(res => this.setState({
                post: res.data
            }))
    }

    */

  componentDidMount() {
    let collapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(collapsible, {})
  }

  scrollDown = e => {
    //e.target.scrollIntoView(); 
    const elem = e.target
    const y = 0.6 * (elem.getBoundingClientRect().top + window.scrollY);
    window.scroll({
      top: y,
      behavior: 'smooth'
    }); 
  }

  render() {
    const { posts } = this.state
    const postList = posts.length ? (
        posts.map(post => {
            return(
              <li key = {post.id} onClick={this.scrollDown}>
                <div className="collapsible-header">{post.title}</div>
                <div className='collapsible-body'>
                  <p>{post.body}</p>
                  <Link to= {'/' + post.id}><button className="btn btn-small indigo darken-4">Know more</button></Link>
                </div>
              </li>
            )
        })
    ) : (
        <div className="center">No data yet</div>
    )

    return (
      <div className="container area">
        <img src={Background1} className='responsive-img' alt=""/> 
          <h4 className="center">Area</h4>
          <ul className="collapsible">
            { postList }
          </ul>
      <People />
      </div>
        
    )
  }
}
            

export default Area;