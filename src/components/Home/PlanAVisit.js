import React, { Component } from 'react';

class PlanAVisit extends Component {

    render() {
        return(
            <div className="planAVisit center" style={{paddingBottom: "70px", width: "100%"}}>
                <a href="/itin" className="waves-effect waves-light btn btn-large" >
                    Plan A Visit!
                </a>
            </div>
        )
    }
}

export default PlanAVisit;