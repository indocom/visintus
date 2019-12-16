import React from 'react'
import { Link } from 'react-router-dom'

const Footer = (props) => {
    return (
      <footer className="page-footer indigo darken-4">
        <div className="container">
          <div className="row">
          	<div className="col s12 m4">
            	<h6>Perhimpunan Indonesia NUS</h6>
                <ul>
                	<li>National University of Singapore</li>
                  <li>Yusof Ishak House, Level 3</li>
                	<li>31 Lower Kent Ridge Road</li>
                  <li>Singapore 119078</li>
                </ul>
            </div>

            <div className="col s12 m6">
              <div className="row">
                <div className="col s12 m5" >
                  <h6>Contact Us</h6>
                  <ul>
                    <li><i className="fas fa-phone"></i>  1234567</li>
                    <li><i className="fas fa-envelope"></i>  pinus@pohon.id</li>
                  </ul>
  	            </div>
                <div className="col s12 m7" id='social'>
                  <h6 className="white-text">Follow us</h6>
                  <a href="https://www.facebook.com/PerhimpunanIndonesiaNUS/" className="btn-floating btn indigo darken-3">
                      <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.instagram.com/pinusonline/" className="btn-floating btn indigo darken-3">
                      <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://www.youtube.com/channel/UCfYU_ttUpJWNEKIbiWoQQHQ/" className="btn-floating btn indigo darken-3">
                      <i className="fab fa-youtube"></i>
                  </a>
               	</div>
              </div>
            </div>
                
            <div className="col s2">
              <h6><a href="#" className='white-text'><i className="fas fa-arrow-up" style={{paddingRight : "10px"}}></i> Top</a></h6>
            </div>
          </div>
        </div>
				<div className="footer-copyright">
					<div className="container center">
						Copyright &copy; PINUS 2019. All rights reserved.
					</div>
				</div>
    	</footer>
    )
}


export default Footer



