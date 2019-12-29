import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import { removePlan } from '../store/actions/planActions'

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

	console.log(props.itin)
	let planList = Object.keys(props.itin).length > 0 ? (
		Object.entries(props.itin).map(([slug, plans]) => {
			return(
				<Fragment key={slug}>
					<h6 className="red-text">{ slug }</h6>
					<ul>
					{
						plans.length > 0 
							? plans.map(plan => (
								<li key={ plan._id }>
									{ plan.name }
									<br/>
									<button onClick = { () => handleRemove(plan._id, slug) }> Remove this plan </button>
								</li>
							))
							: <p>You have deleted all plans for this area</p>
					}
					</ul>
				</Fragment>
			)
		})
	) : (
		<p> You haven't make any plans yet </p>
	) 

	return (
		<Fragment className='container'>
			{ planList }
			<div className="btn" onClick={handleCheckout}>Checkout</div>
		</Fragment>
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
