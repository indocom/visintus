import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { removePlan } from '../store/actions/planActions';
import '../css/itin.css';

const Itin = (props) => {
	const handleRemove = (id, slug) => {
		console.log(id, slug)
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
		const getElem = document.querySelector(id);
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
	let planList = Object.keys(props.itin).length > 0 ? (
		Object.entries(props.itin).map(([slug, plans]) => {
			return(
				<Fragment key={slug}>
					<div className='dropdownItin__title'>
						<h6 className="red-text">{ slug }</h6>
						<button onClick={() => display({slug})}>Click Me!</button>
					</div>
					<div className='dropdownItin__content' id={slug}>
						<ul>
						{
							plans.length > 0 
								? plans.map(plan => (
									<li key={ plan._id }>
										<p>{ plan.name }</p>
										<button onClick = { () => handleRemove(plan._id, slug) }> Remove this plan </button>
									</li>
								))
								: <li>You have deleted all plans for this area</li>
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
			<div className="btn" onClick={handleCheckout}>Checkout</div>
		</div>
	)
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        itin: state.plan.itin
    }
}

const mapDispatchToProps = dispatch => {
    return{
        removePlan : (id, slug) => { dispatch(removePlan(id, slug)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Itin)
