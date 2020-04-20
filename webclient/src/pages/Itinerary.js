import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import M from 'materialize-css';

import { removePlan, removeCategory } from '../store/actions/planActions';

import '../css/itin.css';

const Itin = props => {
  useEffect(() => {
    let collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible, {
      accordion: false
    });
  }, []);

  const { status: planStatus, data: plan, error: planError } = useQuery(
    QUERY_KEY_PLAN_INFO,
    () =>
      client(API_CATEGORIES_PLANINFO, {
        body: {
          categories: props.itin
        }
      })
  );

  const handleRemoveCategory = slug => {
    props.removeCategory(slug);
  };

  const handleRemovePlan = (id, slug) => {
    props.removePlan(id, slug);
  };

  const handleSave = e => {
    M.toast({ html: 'Data saved!', classes: 'teal rounded center top' });
  };

  const handleCheckout = e => {
    e.preventDefault();

    /* TODO: POST itin data to backend when user is logged in*/
    /* current implementation just take from localStorage */

    props.history.push('/checkout');
  };

  let planList =
    Object.keys(plan).length > 0
      ? Object.entries(plan).map(([slug, data]) => {
          return (
            <li key={slug}>
              <div className="collapsible-header">
                <h6>
                  {data.name}
                  <span>
                    <i className="fas fa-angle-down grey-text text-lighten-1"></i>
                  </span>
                </h6>
              </div>
              <div className="collapsible-body">
                <ul>
                  {data.plans.length > 1
                    ? data.plans.map(plan => (
                        <li key={plan._id} style={{ minHeight: 50 }}>
                          <div>
                            {plan.name}
                            {slug !== 'intro' && (
                              <div
                                className="btn btn-small right red"
                                onClick={() => handleRemovePlan(plan._id, slug)}
                              >
                                {' '}
                                Remove{' '}
                              </div>
                            )}
                          </div>
                          <p>{plan.description}</p>
                        </li>
                      ))
                    : data.plans.map(plan => (
                        <li key={plan._id} style={{ minHeight: 50 }}>
                          <div>
                            {plan.name}
                            {slug !== 'intro' && (
                              <div
                                className="btn btn-small right red"
                                onClick={() => handleRemoveCategory(slug)}
                              >
                                {' '}
                                Remove{' '}
                              </div>
                            )}
                          </div>
                          <p>{plan.description}</p>
                        </li>
                      ))}
                </ul>
              </div>
            </li>
          );
        })
      : // <p> You haven't make any plans yet </p>
        null;

  let buttons = (
    <div className="dropdownButtonContainer">
      {/* <div className="btn" style={{ marginRight: 10 }} onClick={handleSave}>
        Save
      </div> */}
      <div className="btn" onClick={handleCheckout} style={{ zIndex: 0 }}>
        Save &amp; Checkout
      </div>
    </div>
  );

  return (
    <div className="container" style={{ padding: '1.5em 0' }}>
      <Link to="/">&lt;&lt;&lt; Continue planning</Link>
      <h5>Your itinerary</h5>
      <div className="dropdownItin">
        {!planList && <p> You haven't make any plans yet </p>}
        <ul className="collapsible">{planList}</ul>
        <br />
        {planList && buttons}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    itin: state.plan.itin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removePlan: (id, slug) => {
      dispatch(removePlan(id, slug));
    },
    removeCategory: slug => {
      dispatch(removeCategory(slug));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Itin);
