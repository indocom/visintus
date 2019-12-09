import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removePlan } from '../../store/actions/planActions'

class Itin extends Component {

    handleRemove = (id) => {
        console.log(id)
        this.props.removePlan(id);
    }

    render() {
        let planList = this.props.itin.length ? (
            this.props.itin.map(plan => {
                return(
                    <li key={ plan.id }>
                        { plan.title }
                        <br/>
                        <button onClick = { () => this.handleRemove(plan.id) }> Remove this plan </button>
                    </li>
                )
            })
        ) : (
            <p> You haven't make any plans yet </p>
        ) 
        return (
            <div className='container'>
                <ul>
                    { planList }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        itin: state.plan.plan
    }
}

const mapDispatchToProps = dispatch => {
    return{
        removePlan : id => { dispatch(removePlan(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Itin)
