import React, { Component } from 'react'
import axios from 'axios'

export default class Signup extends Component {
	state = {
		name: '',
		logo_url:'',
		description: '',
	}

	handleChange = e => {
		this.setState({
			[e.target.id] : e.target.value
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const data = JSON.stringify({
			authToken: 'visintus',
			category: this.state
		})
		console.log(data)
		await axios.post('http://localhost:3000/categories', data, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',				
			},
			crossdomain: true,
		}).catch((err) => console.log(err));
	}
render() {
	// const { auth, authError } = this.props
	// if (auth.uid) return <Redirect to='/' />

	return (
		<div className="container">
			<form className="white" onSubmit = {this.handleSubmit}>
				<h4 className="grey-text text-darken-3">Admin Page</h4>
				{/* <div className="row">
					<div className="col l6 m12"> */}
						<h6>Category Info</h6>
						<div className="input-field">
							<label htmlFor="name">Category Name</label>
							<input type="text" id="name" onChange={this.handleChange} required/>
						</div>

						<div className="input-field">
							<label htmlFor="logo_url">Logo URL</label>
							<input type="text" id="logo_url" onChange={this.handleChange}/>
						</div>

						<div className="input-field">
							<label htmlFor="description">Description</label>
							<input type="text" id="description" onChange={this.handleChange}/>
						</div>
{/* 
						<h6>Banner</h6>
						<div className="input-field">
							<label htmlFor="banner_image_url">Image URL</label>
							<input type="text" id="banner_image_url" onChange={this.handleChange} required/>
						</div>
					</div>
					<div className="col l5 offset-l1 m12">
						<h6>Plans</h6>
						<div className="input-field">
							<label htmlFor="plan_name">Plan Name</label>
							<input type="text" id="plan_name" onChange={this.handleChange} required/>
						</div>
						<div className="input-field">
							<label htmlFor="plan_desc">Plan Desc</label>
							<input type="text" id="plan_desc" onChange={this.handleChange}/>
						</div>

						<h6>Representatives</h6>
						<div className="input-field">
							<label htmlFor="reps_name">Reps Name</label>
							<input type="text" id="reps_name" onChange={this.handleChange} required/>
						</div>
						<div className="input-field">
							<label htmlFor="reps_desc">Reps Desc</label>
							<input type="text" id="reps_desc" onChange={this.handleChange}/>
						</div>
						<div className="input-field">
							<label htmlFor="reps_photo_url">Reps Photo URL</label>
							<input type="text" id="reps_photo_url" onChange={this.handleChange}/>
						</div>
					</div>
				</div> */}
				<div className="input-field center">
					<button className="btn btn-large z-depth-0">Add to DB</button>
					{/* <div className="red-text center">
							{ authError ? <p>{ authError }</p> : null }
					</div> */}
				</div>
			</form>
		</div>
	)
	}
}

