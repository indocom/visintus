import React, { Component } from 'react';
import Loading from './Loading';
import '../css/Carousel.css';
import carouselUtils from './carouselUtils';

class Carousel extends Component {
  componentDidMount() {
    if (this.props.banners && this.props.banners.length > 0) {
      carouselUtils();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.banners.length !== this.props.banners.length) {
      carouselUtils();
    }
  }

  render() {
    const { banners } = this.props;
    return banners && banners.length > 0 ? (
      <div className="carousel">
        <button className="carousel__button carousel__button--left">
          <i className="fas fa-chevron-left" style={{ fontSize: '2rem' }}></i>
        </button>

        <div className="carousel__track-container">
          <ul className="carousel__track">
            {banners.map((banner, index) => (
              <li className="carousel__slide current-slide" key={index}>
                <img
                  className="carousel__image"
                  src={banner.image_url}
                  alt={`banner${index + 1}`}
                />
              </li>
            ))}
          </ul>
        </div>

        <button className="carousel__button carousel__button--right">
          <i className="fas fa-chevron-right" style={{ fontSize: '2rem' }}></i>
        </button>

        <div className="carousel__nav">
          <button className="carousel__indicator current-slide"></button>
          {banners.slice(1).map((banner, index) => (
            <button className="carousel__indicator" key={index}></button>
          ))}
        </div>
      </div>
    ) : (
      <div className="carousel"></div>
    );
  }
}

export default Carousel;

// render(){
//     const { pics } = this.props
//     const picCarousel = pics.length ? (
//         pics.map(pic => {
//             return(
//             <img  key={pic.id} src={pic.url} className='carousel-item' alt={pic.title} />
//             )
//         })
//     ) : (
//         <div className="center">No data yet</div>
//     )
//     return (
//         <div className="carousel carousel-slider">
//             { picCarousel }
//         </div>
//     )
// }
