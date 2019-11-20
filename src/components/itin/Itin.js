import React, { Component } from 'react'
import { connect } from 'react-redux'

class Itin extends Component {
    planList = this.props.itin
    render() {
        console.log(this.planList);
        return (
            <div>
                Hello World!
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    itin : state.plan
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps)(Itin)
