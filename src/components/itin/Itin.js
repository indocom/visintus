import React, { Component } from 'react'
import { connect } from 'react-redux'

class Itin extends Component {
    render() {
        let planList = this.props.itin.length ? (
            this.props.itin.map(plan => {
                return(
                    <p>{ plan }</p>
                )
            })
        ) : (
            <p> You haven't make any plans yet </p>
        ) 
        return (
            <div className='container'>
                { planList }
            </div>
        )
    }
}

const mapStateToProps = ({ plan }) => ({
    itin: plan.plan
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps)(Itin)
