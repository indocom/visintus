import React, { Component } from 'react'
import M from 'materialize-css'
import axios from 'axios'
import Image from '../../background1.jpg'

class HomeCarousel extends Component {
    state = {
        displayed: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(res =>{
                this.setState({
                    displayed: res.data.slice(0,5)
                });
            })
            .then(() => {let elems = document.querySelectorAll('.carousel');
                M.Carousel.init(elems,{
                    fullWidth: true,
                    indicators: true
                });
            })
    }

    render() {
        const { displayed } = this.state
        const displayedCarousel = displayed.length ? (
            displayed.map(content => {
                return (
                    <img  src={Image} className='carousel-item'/>
                )
            })
        ) : (
            <div className="center">Nothing here!</div>
        )

        return (
            <div className="carousel carousel-slider">
                {displayedCarousel}
            </div>
        )
    }
}

export default HomeCarousel;