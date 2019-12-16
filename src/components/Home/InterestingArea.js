import React, { Component } from 'react'
import Image from '../../assets/background1.jpg'
import axios from 'axios'

class InterestingArea extends Component {
    state = {
        areas: []
    }
    
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                this.setState({
                    areas: res.data.slice(0,6)
                })
            })
    }

    render() {
        const { areas } = this.state
        const areasList = areas.length ? (
            areas.map(area => {
                return (
                    <div className="col s4 m4 l4">
                        <div className="card">
                            <div className="card-image waves-effect waves-block waves-light">
                                <a href="/category/soc">
                                    <span className="card-title">
                                        School of Computing
                                    </span>
                                    <img src={Image}/>
                                </a>
                            </div>
                        </div>        
                    </div>
                )
            })
        ) : (
            <div className="center">No areas yet :(</div>
        )

        return (
            <div className="areas center">
                <h3>Interesting Areas</h3>
                <div className="col s12">
                    <div className="row">
                        {areasList}
                    </div>
                </div>
            </div>
        )
    }
}

export default InterestingArea;
