import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux' 

const BannerDetails = ({banners, slug, setDetails}) => {
	const [isActive, setIsActive] = useState(false)
	const handleRemove = async (id, slug) => {
		// const data = JSON.stringify({
		// 	authToken: 'visintus',
		// })
		await axios.delete(`/categories/${slug}/banners/${id}`, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',				
			},
			crossdomain: true,
		})
			.then(res => res.status === 200 && setDetails([]))
			.catch((err) => console.log(err));
	}

	const handleAdd = () => {
		setIsActive(!isActive)
	}

	return(
		<>
      <h5>Banner Details <div className="btn right btn-small" onClick={handleAdd}>Add banner</div></h5>
			{ isActive && <UpsertBanner slug={slug}/>}
			<ul>
				{ banners && banners.length && banners.map((detail, index) => (
          			<li key={index} style={{minHeight: 50}}>
						{detail.image_url}
						<div className="btn btn-small right red" onClick={() => handleRemove(detail._id, slug)}>Remove</div>
					</li>
        		))}
			</ul>
		</>
	)
}

class UpsertBanner extends Component {
	state = {
		image_url: ''
	}

	handleChange = e => {
		this.setState({
			[e.target.id] : e.target.value
		})
	}

	handleSubmit = async (e) => {
		const data = JSON.stringify({
			authToken: 'visintus',
			banner: this.state
		})

		const token = localStorage.getItem('token');

		console.log(data);

		await axios.post(`/categories/${this.props.slug}/banners` , data, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',	
				'Authorization': `${token}`			
			},
			crossdomain: true,
		}).catch((err) => console.log(err));
	}
	render() {
	// const { auth, authError } = this.props
	// if (auth.uid) return <Redirect to='/' />
		return (
			<form className="white" onSubmit = {this.handleSubmit}  style={{paddingBottom: 20}}>
				<h6 className="grey-text text-darken-3">Add Banner</h6>
				<div className="input-field">
					<label htmlFor="image_url">Image URL</label>
					<input type="text" id="image_url" onChange={this.handleChange} required/>
				</div>
				<button className="btn">Add Banner</button>
			</form>
		)
	}
}


export default BannerDetails