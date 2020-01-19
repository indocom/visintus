import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logOutUser } from '../../store/actions/authActions.js'

const Navbar = (props) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const token = localStorage.getItem('token');

  const handleLogout = (e) => {
    e.preventDefault();
    console.log('handleLogout', token);
    console.log('handleLogout', props);
    const awaitLogOut = new Promise( (resolve, reject) => {
      props.logOutUser(token);
      localStorage.setItem('token', null);
      localStorage.setItem('isLoggedIn', false);
      setTimeout(() => resolve('logout success'));
    })
    awaitLogOut.then( (value) => {
      console.log(value);
      window.location.replace('/login');
    })
  }
  return (
    <nav className="nav-wrapper indigo darken-4">
      <div className="container">
        <Link to='/' className="brand-logo">Visintus</Link>
        <ul className = 'right'>
          {
            (isLoggedIn === "true") 
              ?
              (
                <li>
                  <button onClick={handleLogout}>
                    Logout!
                  </button>
                </li>
              )
              :
              (
                <li><NavLink to='/login'>Login</NavLink></li>
              )
          }
          <li><NavLink to='/itin'>Itin</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser  : (token) => { dispatch(logOutUser(token)) }
  }
}

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(Navbar)