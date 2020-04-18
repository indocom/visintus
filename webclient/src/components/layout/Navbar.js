import React, { useEffect } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logOutUser } from '../../store/actions/authActions.js';
import M from 'materialize-css';
import Logo from '../../assets/images/logo.png';

const Navbar = props => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const token = localStorage.getItem('token');
  const initials = localStorage.getItem('initials');
  const role = localStorage.getItem('role');

  useEffect(() => {
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);
  }, []);

  useEffect(() => {
    let elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }, []);

  const handleLogout = e => {
    e.preventDefault();

    const awaitLogOut = new Promise((resolve, reject) => {
      props.logOutUser(token);
      localStorage.setItem('token', null);
      localStorage.setItem('isLoggedIn', false);
      localStorage.setItem('initials', null);
      localStorage.setItem('role', null);
      setTimeout(() => resolve('logout success'));
    });

    awaitLogOut.then(value => {
      // console.log(value);
      window.location.replace('/');
    });
  };

  return (
    <>
      <ul id="nav-mobile" className="sidenav">
        <li>
          <a id="logo-container" href="#landing">
            <img
              src={Logo}
              alt="PINUS Logo"
              style={{ height: 50, marginTop: 5 }}
            />
          </a>
        </li>
        <li>
          <a target="_blank" href="https:pi-nus.org">
            PINUS Homepage
          </a>
        </li>
        <li>
          <NavLink to="/itinerary">Itinerary</NavLink>
        </li>
        {isLoggedIn === 'true' ? (
          <>
            <li>
              <NavLink to="/">Account</NavLink>
            </li>
            {['admin', 'superadmin'].includes(role) && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <li> <NavLink to="/login"> Login </NavLink> </li>
        )}
      </ul>

      <nav className="nav-wrapper black ">
        <a href="#" data-target="nav-mobile" className="sidenav-trigger">
          <i className="fas fa-bars"></i>
        </a>
        <img
          src={Logo}
          className="hide-on-large-only"
          alt="PINUS Logo"
          style={{
            height: 40,
            marginTop: 8,
            position: 'absolute',
            left: 'calc(50% - 70px)'
          }}
        />

        <ul id="dropdownLogout" className="dropdown-content">
          <li>
            <Link to="/">Account</Link>
          </li>
          {['admin', 'superadmin'].includes(role) && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>

        <div className="container hide-on-med-and-down">
          <Link to="/" className="brand-logo">
            Visintus
          </Link>
          <ul className="right">
            <li>
              <a target="_blank" href="https:pi-nus.org">
                PINUS Homepage
              </a>
            </li>
            <li>
              <NavLink to="/itinerary">Itinerary</NavLink>
            </li>
            {isLoggedIn === 'true' ? (
              <li>
                <a
                  className="dropdown-trigger"
                  href="#!"
                  data-target="dropdownLogout"
                >
                  {initials}{' '}
                  <i
                    className="fas fa-chevron-down"
                    style={{ fontSize: '1rem' }}
                  ></i>
                </a>
              </li>
            ) : (
              <li> <NavLink to="/login">Login</NavLink> </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logOutUser: token => {
      dispatch(logOutUser(token));
    }
  };
};

export default compose(withRouter, connect(null, mapDispatchToProps))(Navbar);
