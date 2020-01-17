import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav-wrapper indigo darken-4">
      <div className="container">
        <Link to="/" className="brand-logo">
          Visintus
        </Link>
        <ul className="right">
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/itin">Itin</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
