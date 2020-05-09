import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import M from 'materialize-css';
import Logo from '../../assets/images/logo.png';

import { isLoggedIn, isAdmin } from '~/utils/auth-client';
import { useUser } from '~/context/user-context.js';
import { useAuth } from '~/context/auth-context.js';

const Navbar = props => {
  const user = useUser();
  const authClient = useAuth();

  // materialize dropdown effect
  useEffect(() => {
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);
  }, []);

  const handleLogout = e => {
    authClient.logout();
  };

  // Sidenav
  function SideNav({ user }) {
    // materialize sidenav effect
    useEffect(() => {
      let elems = document.querySelectorAll('.sidenav');
      M.Sidenav.init(elems);
    }, []);

    return (
      <ul id="nav-mobile" className="sidenav">
        <li style={{ height: 20 }}></li>
        <li>
          <Link to="/" id="logo-container">
            <img
              src={Logo}
              alt="PINUS Logo"
              style={{ height: 50, marginTop: 5 }}
            />
          </Link>
        </li>
        <li style={{ height: 20 }}></li>
        <li>
          <a target="_blank" href="https:pi-nus.org">
            PINUS Homepage
          </a>
        </li>
        <li>
          <NavLink to="/itinerary">Itinerary</NavLink>
        </li>
        {isLoggedIn() ? (
          <>
            <li>
              <NavLink to="/">Account</NavLink>
            </li>
            {isAdmin(user) && (
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
          <li>
            {' '}
            <NavLink to="/login"> Login </NavLink>{' '}
          </li>
        )}
      </ul>
    );
  }

  return (
    <>
      <SideNav user={user} />

      <nav className="nav-wrapper black ">
        <a href="#" data-target="nav-mobile" className="sidenav-trigger">
          <i className="fas fa-bars"></i>
        </a>
        <Link to="/" className="brand-logo hide-on-large-only">
          <span style={{ textTransform: 'uppercase' }}>
            <img
              src={Logo}
              alt="PINUS Logo"
              style={{
                height: 40,
                verticalAlign: 'middle',
                paddingRight: 10,
                transform: 'translateY(-5px)'
              }}
            />
            Visit
          </span>
        </Link>

        <ul id="dropdownLogout" className="dropdown-content">
          <li>
            <Link to="/">Account</Link>
          </li>
          {isAdmin(user) && (
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
            <span style={{ textTransform: 'uppercase' }}>
              <img
                src={Logo}
                alt="PINUS Logo"
                style={{
                  height: 40,
                  verticalAlign: 'middle',
                  paddingRight: 10,
                  transform: 'translateY(-5px)'
                }}
              />
              Visit
            </span>
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
            {isLoggedIn() ? (
              <li>
                <a
                  className="dropdown-trigger"
                  href="#!"
                  data-target="dropdownLogout"
                >
                  {user?.initials}{' '}
                  <i
                    className="fas fa-chevron-down"
                    style={{ fontSize: '1rem' }}
                  ></i>
                </a>
              </li>
            ) : (
              <li>
                {' '}
                <NavLink to="/login">Login</NavLink>{' '}
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
