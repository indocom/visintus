import React, { Component, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

const Category = (props) => {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		async function FetchAllCategories(){
			let {data} = await axios.get('/categories').catch(err => console.log(err));
			console.log(data)
			if(data){
				if(!data.message) return;
				setCategories(data.message);
			} else {
				console.log(`Error in loading /pages/category`)
			}
		};
		FetchAllCategories();
	}, [categories.length])

	const handleRemove = async (slug) => {
		const data = JSON.stringify({
			"token": props.token,
		})
		console.log(data)
		await axios.delete(`/categories/${slug}`, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Authorization': `${props.token}`				
			},
			crossdomain: true,
		})
			.then(res => res.status == 200 && setCategories([]))
			.catch((err) => console.log(err));
	}

	const categoriesList = categories.length > 0 ? (
    categories.map((category, index) => {
      return (
        <li key={index} style={{minHeight: 50}}>
					<Link to={props.baseURL + `/${category.slug}`}>
						<span>{category.name}</span>
					</Link>
					<div className="right">
						<button data-target="update" className="btn" onClick={() => props.handleUpsert(category.slug)}>Update</button>
						<button className="btn red" onClick={() => handleRemove(category.slug)}>Remove</button>
					</div>
        </li>
      )
    })
  ) : (
    <div className="center">No data yet :(</div>
	)
	
	return(
		<ul>
			{ categoriesList }
		</ul>
	)
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		token: state.auth.token
	}
}

const mapDispatchToProps = (dispatch) => {

}

const ConnectCategoryToRedux = connect(mapStateToProps)(Category);


class UpsertCategory extends Component {
	state = {
		name: '',
		logo_url:'',
		description: '',
	}

	title= this.props.slug === '' ? 'Add Category' : 'Update Category';
	endpoint= this.props.slug === '' ? '' :  `/${this.props.slug}`;

	handleChange = e => {
		this.setState({
			[e.target.id] : e.target.value
		})
	}

	handleSubmit = async (e) => {
		const data = JSON.stringify({
			authToken: 'visintus',
			category: this.state
		})
		console.log(data)

		await axios.post('/categories'+ this.endpoint , data, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',				
			},
			crossdomain: true,
		}).catch((err) => console.log(err));
	}
	render() {
	// const { auth, authError } = this.props
	// if (auth.uid) return <Redirect to='/admin' />

		return (
			<>
			<form onSubmit = {this.handleSubmit}  style={{padding: 15, backgroundColor: "#eee"}}>
				<h5 className="grey-text text-darken-3">{this.title}</h5>
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
				<button className="btn">{this.title}</button>
				<div className="btn" onClick={() => {this.props.closeForm()}}>Cancel</div>
			</form>
			</>
		)
	}
}

export default (props) => {
	let [isActive, setIsActive] = useState(false);
	let [slug, setSlug] = useState(''); //'' -> add category
	let handleUpsert = (slug) => {
		setIsActive(!isActive);
		setSlug(slug);
	}

	return(
		<div className="container">
			<h4>Category Admin Page</h4>

			{/* Input form to add or update. slug property to determine API endpoint */}
			{ isActive && <UpsertCategory slug={slug} closeForm={() => setIsActive(!isActive)}/>}
			{ !isActive && <button onClick={() => handleUpsert('')} className="btn">Add category</button> }
			<ConnectCategoryToRedux handleUpsert={handleUpsert} baseURL={props.match.path}/>
		</div>
	)
}
