import React, { Component } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import Stars from '../stars.jpg'
import '../index.css'
import M from 'materialize-css'

class People extends Component {
    state = {
        people:  [
            {
              "id": 1,
              "name": "Guanteng",
              "desc": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            },
            {
              "id": 2,
              "name": "si Cuantik",
              "desc": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
            },
            {
              "id": 3,
              "name": "BC",
              "desc": "OOF"
            }]
    }
    render() {
        const { people } = this.state
        const peopleList = people.length ? (
            people.map(person => {
                return(
                  <div class="col s12 m4" id={person.id}>
                    <div class="card ayellow team">
                        <div class="card-image">
                            <img src={Stars} alt="" />
                        </div>
                        <div class="details">
                            <h3>{person.name}</h3>
                            <p style={{color: 'white'}}>{person.desc}</p>
                            <ul>
                                <li><a href=""><i class="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                                <li><a href=""><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
                                <li><a href=""><i class="fab fa-telegram-plane" aria-hidden="true"></i></a></li>
                                <li><a href=""><i class="fab fa-linkedin-in" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                )
            })
        ) : (
            <div className="center">No people to accompany you yet. Sorry!</div>
        )
    
        return (
          <div className="people center">
            <h3>Our Representative</h3>
            <div class="col s12">
                <div class="row">
                    {peopleList}
                </div>
            </div>
          </div>
            
        )
    }
}
                
    
export default People;