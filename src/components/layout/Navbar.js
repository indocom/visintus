import React, { useEffect, Fragment } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import M from 'materialize-css'

const Navbar = (props) => {
  const pathname = props.location.pathname;
  const categories = ["soc", "fos", "foe", "biz", "sde", "yst"];

  useEffect(() => {
    let dropdown = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdown, {
      hover: true,
      coverTrigger: false,
    })
  },[])

  return (
    <nav className="nav-wrapper indigo darken-4">
      <div className="container">
        <Link to='/' className="brand-logo">Visit NUS by PINUS</Link>
        <ul className = 'right'>
          <li><Link to={pathname} data-target='categoriesDropdown' className='dropdown-trigger'>Areas</Link></li>
          <li><NavLink to='/login'>Login</NavLink></li>
          <li><NavLink to='/itin'>Itin</NavLink></li>
        </ul>

        <ul id='categoriesDropdown' className='dropdown-content'>
          <Fragment>
            {
              categories.map((category, index) => (
                <li key={index}><Link to={`/category/${category}`} className="indigo-text">{category}</Link></li>
              ))
            }
          </Fragment>
        </ul>
      </div>
    </nav>
  )
}


export default withRouter(Navbar)