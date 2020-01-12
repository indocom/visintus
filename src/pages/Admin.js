import React from 'react'
import AdminComponents from '../components/admin'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
	const token = localStorage.getItem('token');
	if(token !== "null" && token !== null) {
		return(
			<div className="container">
				<h3>Admin Dashboard</h3>
				<p>Hello from dashboard</p>
				<Link to='/admin/categories'>Add / Update New Category</Link>
			</div>
		)
	} else {
		return (
			<div>
				<h1>You Are Not Authorized!</h1>
			</div>
		)
	}
}

export const Components = {
	...AdminComponents
};
