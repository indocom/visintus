import React from 'react';
import AdminComponents from '../components/admin';
import { Link, Redirect } from 'react-router-dom';

export const Dashboard = () => {
  const role = localStorage.getItem('role');
  if (role === 'admin') {
    return (
      <div className="container">
        <h3>Admin Dashboard</h3>
        <p>Hello from dashboard</p>
        <div>
          <Link to="/admin/highlights">Add / Update Home Highlights</Link>
        </div>
        <div>
          <Link to="/admin/categories">Add / Update New Category</Link>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export const Components = {
  ...AdminComponents
};
