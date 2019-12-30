import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'

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
			authToken: 'visintus',
		})
		console.log(data)
		await axios.delete(`/categories/${slug}`, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',				
			},
			crossdomain: true,
		})
			.then(res => res.status == 200 && setCategories([]))
			.catch((err) => console.log(err));
	}

	const categoriesList = categories.length > 0 ? (
    categories.map((category, index) => {
      return (
        <li key={index}>
					{/* <Link to={`/category/${category.slug}`}> */}
						<span>{category.name}</span>
						<p>{category.description}</p>
						<button data-target="update" className="btn" onClick={() => props.handleUpsert(category.slug)}>Update Category</button>
						<button className="btn red" onClick={() => handleRemove(category.slug)}>Remove Category</button>
					{/* </Link> */}
        </li>
      )
    })
  ) : (
    <div className="center">No data yet :(</div>
	)
	
	return(
		<>
			<button onClick={() => props.handleUpsert('')} className="btn">Add new category</button>
			<ul>
				{ categoriesList }
			</ul>
		</>
	)
}

class UpsertCategory extends Component {
	state = {
		name: '',
		logo_url:'',
		description: '',
	}

	title = this.props.slug === '' ? 'Add Category' : 'Upsert Category'

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

		await axios.post('/categories'+ this.props.slug , data, {
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
			<form className="white" onSubmit = {this.handleSubmit}>
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
				<button className="btn">{this.title}</button>
					{/* <div className="red-text center">
							{ authError ? <p>{ authError }</p> : null }
					</div> */}
			</form>
		)
	}
}

export default () => {
	let [isActive, setIsActive] = useState(false);
	let [slug, setSlug] = useState(''); //'' -> add category
	return(
		<div className="container">
			<h4>Category Admin Page</h4>
			{ isActive && <UpsertCategory slug={slug} />}
			<Category handleUpsert={(slug) => {
				setIsActive(!isActive);
				setSlug(slug)
			}}/>
		</div>
	)
}