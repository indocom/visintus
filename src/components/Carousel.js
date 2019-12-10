import React, { Component } from 'react'
import M from 'materialize-css'

class Carousel extends Component{
    componentDidUpdate(){
        let carousel = document.querySelectorAll(".carousel");
        M.Carousel.init(carousel, {
            fullWidth: true,
            indicators: true
        });      
    }
    render(){
        const { pics } = this.props
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

export default Carousel
