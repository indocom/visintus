import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import { removePlan, removeCategory } from '../store/actions/planActions'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import '../css/itin.css';


const Itin = (props) => {
	const handleRemovePlan = (id, slug) => {
		props.removePlan(id, slug);
	}

	const handleCheckout = (e) => {
		e.preventDefault();
		console.log(props);

		/* TODO: POST itin data to backend */

		props.history.push('/checkout')
	}

	const display = (value) => {
		const id = '#' + value.slug;
		const getElem = document.querySelector(`${id}`);
		if(getElem.style.position === 'relative') {
			getElem.style.position = 'absolute';
			getElem.style.opacity = '0';
			getElem.style.transition = 'all 0s linear';
		} else {
			getElem.style.position = 'relative';
			getElem.style.opacity = '1';
			getElem.style.transition = 'all 0.3s linear';
		}
	}
	
	console.log(props.itin)
	const handleSave = (e) => {
		M.toast({ html : 'Data saved!', classes: 'teal rounded center top'});
	}

	const handleRemoveCategory = (slug) => {
		props.removeCategory(slug);
	}

	let planList = Object.keys(props.itin).length > 0 ? (
		Object.entries(props.itin).map(([slug, plans]) => {
			return(
				<Fragment key={slug}>
					<div className='dropdownItin__title'>
						<h6 className="red-text">{ slug }</h6>
						<button onClick={() => display({slug})}><i class="fas fa-chevron-down"></i></button>
					</div>
					<div className='dropdownItin__content' id={slug}>
						<ul>
						{
							plans.length > 0 
								? plans.map((plan) => (
									<li key={ plan._id } style={{minHeight: 50}}>
										<p>{ plan.name }</p>
										{ slug !== "intro" && <div className="btn btn-small right red" onClick = { () => handleRemovePlan(plan._id, slug) }> Remove </div>}
									</li>
								))
								: (
									<>
										<p>You have deleted all plans for this area.</p> 
										<div>You can either find out more <Link to={`/category/${slug}`}>interesting items here</Link> or delete <div style={{color: "#039be5", cursor: "pointer", display: "inline"}} onClick={() => handleRemoveCategory(slug)}>the area</div> from your itinerary</div>
									</>
								)
						}
						</ul>
					</div>
				</Fragment>
			)
		})
	) : (
		<p> You haven't make any plans yet </p>
	) 

	return (
		<div className='dropdownItin'>
			{ planList }
			<br/>
			<div className='dropdownButtonContainer'>
				<div className="btn" style={{marginRight: 10}} onClick={handleSave}>Save</div>
				<div className="btn" onClick={handleCheckout}>Save &amp; Checkout</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
    return {
        itin: state.plan.itin
    }
}

const mapDispatchToProps = dispatch => {
    return{
				removePlan : (id, slug) => { dispatch(removePlan(id, slug)) },
				removeCategory: (slug) => { dispatch(removeCategory(slug)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Itin)
