import React, { Component } from 'react'
import axios from 'axios'
import Stars from '../../stars.jpg'

class AreaPeople extends Component {
    state = {
        people:  []
    }


    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                console.log(res);
                this.setState({
                    people: res.data.slice(0,4)
                });
            })
    }

    render() {
        const { people } = this.state
        const peopleList = people.length ? (
            people.map(person => {
                return(
                  <div className="col s12 m4 l3" key={person.id}>
                    <div className="card ayellow team">
                        <div className="card-image">
                            <img src={Stars} alt="" />
                        </div>
                        <div className="details">
                            <h3>{person.name}</h3>
                            <p style={{color: 'white'}}>{person.desc}</p>
                            <ul>
                                <li><a href=""><i className="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                                <li><a href=""><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                                <li><a href=""><i className="fab fa-telegram-plane" aria-hidden="true"></i></a></li>
                                <li><a href=""><i className="fab fa-linkedin-in" aria-hidden="true"></i></a></li>
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
            <div className="col s12">
                <div className="row">
                    {peopleList}
                </div>
            </div>
          </div>
            
        )
    }
}
                
    
export default AreaPeople;
