import React, { Component } from 'react'
import axios from 'axios'
import M from 'materialize-css'

class AreaCarousel extends Component {
    state = {
        pics: [] 
        /*
          {
            "id": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "url": "https://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952",
            "description" : "est rerum tempore vitae\nsequi sint nihil reprehenderit"
          } 
        */
    }
    
 
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(res => {
                this.setState({
                    pics: res.data.slice(0,5)
                });
            })
            .then(() => {let carousel = document.querySelectorAll(".carousel");
                M.Carousel.init(carousel, {
                    fullWidth: true,
                    indicators: true
                });
            })       
    }

  render() {
    const { pics } = this.state
    const picCarousel = pics.length ? (
        pics.map(pic => {
            return(
              <img  key={pic.id} src={pic.url} className='carousel-item' alt={pic.title} /> 
            )
        })
    ) : (
        <div className="center">No data yet</div>
    )

    return (
      <div className="carousel carousel-slider">
        { picCarousel }
      </div>        
    )
  }
}
            

export default AreaCarousel;
