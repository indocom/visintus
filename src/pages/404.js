import React from 'react'
import { Link } from 'react-router-dom'

function Fourofour() {
  return (
    <div className="container">
      <div style={{minHeight: 50}}></div>
      <h4>Uh oh.</h4>
      <p>That page you requested could not be found.</p>
      <p>Are you looking for your <Link to='/itin'>plan</Link>, instead?</p>
    </div>
  )
}

export default Fourofour
