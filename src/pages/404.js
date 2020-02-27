import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container center">
      <div style={{ minHeight: 50 }}></div>
      <h2>Uh oh.</h2>
      <h6>
        It's not your fault! The page you requested might have been removed, had
        its name changed, or temporarily unavailable
      </h6>
      <h6>
        Are you looking for your <Link to="/itinerary">plan</Link>, instead?
      </h6>
      <div style={{ minHeight: 30 }}></div>
      <Link to="/" className="btn">
        Go to homepage
      </Link>
    </div>
  );
}

export default NotFound;
