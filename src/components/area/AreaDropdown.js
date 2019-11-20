import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPlan } from '../../store/actions/planActions'
import M from 'materialize-css'

class AreaDropdown extends Component {
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
          }]
    }

   componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                const newposts = [...this.state.posts, ...res.data.slice(4,7)];
                this.setState({
                    posts: newposts
                });
            })
            .then(() => {
                let collapsible = document.querySelectorAll(".collapsible");
                M.Collapsible.init(collapsible, {})
            })       
    }
    
/*
  componentDidMount() {
    let collapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(collapsible, {})
  }
*/

  handleAdd = post => {
    console.log(post);
    this.props.addPlan(post.title);
    console.log(this.props);
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
    console.log(this.props)
    const { posts } = this.state
    const postList = posts.length ? (
        posts.map(post => {
            return(
              <li key = {post.id} onClick={this.scrollDown}>
                <div className="collapsible-header">
                  {post.title}
                  <span><i className="fas fa-angle-down grey-text text-lighten-1"></i></span>
                </div>
                <div className='collapsible-body'>
                  <p>{post.body}</p>
                  <Link to= {'/' + post.id }><button className="btn btn-small indigo darken-4">Know more</button></Link>
                  <button className="btn btn-small indigo darken-4" onClick = { () => this.handleAdd(post) }>Add to your plan!</button>
                </div>
              </li>
            )
        })
    ) : (
        <div className="center">No data yet</div>
    )

    return (
      <div className="dropdown">
        <h4 className="center">Area</h4>
        <ul className="collapsible">
          { postList }
        </ul>
      </div>
        
    )
  }
}

const mapStateToProps = ({ plan }) => {
  return {
    plan
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPlan : plan => { dispatch(addPlan(plan)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaDropdown)
