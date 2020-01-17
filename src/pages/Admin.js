import React from 'react';
import AdminComponents from '../components/admin';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="container">
      <h3>Admin Dashboard</h3>
      <p>Hello from dashboard</p>
      <Link to="/admin/categories">Add / Update New Category</Link>
    </div>
  );
};

export const Components = {
  ...AdminComponents
};
