import React, { Component } from 'react'
import M from 'materialize-css'
import axios from 'axios'

class PlanAVisit extends Component {

    render() {
        return(
            <div className="center">
                <a href="/itin" className="waves-effect waves-light btn">Plan A Visit!</a>
            </div>
        )
    }
}

export default PlanAVisit;