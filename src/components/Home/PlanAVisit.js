import React, { Component } from 'react';
import Image from '../../background1.jpg';
import M from 'materialize-css';
import axios from 'axios';

class PlanAVisit extends Component {

    render() {
        return(
            <div className="planAVisit" style={{height: "600px", width: "100%"}}>
                <a href="/itin" className="waves-effect waves-light btn" style={{
                    left: "50%",
                    transform: "translate(-50%,300px)"}}>
                    Plan A Visit!
                </a>
                <img src={Image} alt=""/> 
            </div>
        )
    }
}

export default PlanAVisit;