import React, { Component } from 'react'
import M from 'materialize-css'
import Image from '../../background1.jpg'
import Axios from 'axios'

class InterestingArea extends Component {
    state = {
        areas: []
    }
    
    componentDidMount() {
        Axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                this.setState({
                    areas: res.data.slice(0,6)
                })
            })
            .then(() => {let elems = document.querySelectorAll(".modal");
                M.Modal.init(elems, {
                    opacity: 1
                });
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
                                <span data-target="SOC" className="card-title modal-trigger">School of Computing</span>
                                <img data-target="SOC" className="modal-trigger" src={Image}/>
                            </div>

                            {/* content of the pop up */}
                            <div id="SOC" className="modal">
                                <p style={{textAlign: "right"}}>
                                    <a href="#!" class="modal-close waves-effect waves-green btn-flat" style={{color: "red"}}>X</a>
                                </p>
                                <div className="modal-content">
                                    <h4>NUS School of Computing</h4>
                                </div>
                                <div className="modal-footer">
                                    <a href="/a/soc" className="modal-close waves-effect waves-green btn-flat">Learn More...</a>
                                </div>
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