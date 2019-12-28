import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class PlanAVisit extends Component {

    render() {
        return(
            <div className="planAVisit center" style={{paddingBottom: "70px", width: "100%"}}>
                <Link to="/itin" className="waves-effect waves-light btn btn-large" >
                    Plan A Visit!
                </Link>
            </div>
        )
    }
}

export default PlanAVisit;