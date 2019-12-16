import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'

const Navbar = (props) => {
    return (
        <nav className="nav-wrapper indigo darken-4">
            <div className="container">
                <a className="brand-logo">Visit NUS by PINUS</a>
                <ul className = 'right'>
                    <li><Link to='/'>Home</Link></li>
                    <li><NavLink to='/category/soc'>SoC</NavLink></li>
                    <li><NavLink to='/login'>Login</NavLink></li>
                    <li><NavLink to='/signup'>Signup</NavLink></li>
                    <li><NavLink to='/itin'>Itin</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}


export default withRouter(Navbar)