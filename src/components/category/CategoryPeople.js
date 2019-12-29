import React from 'react'
import Stars from '../../assets/stars.jpg'

const AreaPeople = (props) => {
  const { reps } = props
  const peopleList = reps ? (
    reps.map(person => {
      return(
      <div className="col s12 m4 l3" key={person._id}>
        <div className="card ayellow team">
          <div className="card-image">
              <img src={person.photo_url} alt="Representative photo" />
          </div>
          <div className="details">
              <h3>{person.name}</h3>
              <p style={{color: 'white'}}>{person.description}</p>
              <ul>
                <li><a href="/"><i className="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                <li><a href="/"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                <li><a href="/"><i className="fab fa-telegram-plane" aria-hidden="true"></i></a></li>
                <li><a href="/"><i className="fab fa-linkedin-in" aria-hidden="true"></i></a></li>
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
    
export default AreaPeople;
