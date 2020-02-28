import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';

import { removePlan, removeCategory } from '../store/actions/planActions';

import '../css/itin.css';

const Itin = props => {
  const [plan, setPlan] = useState({});

  useEffect(() => {
    let collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible, {
      accordion: false
    });
  }, []);

  useEffect(() => {
    const fetchPlanInfo = async () => {
      try {
        let categories = JSON.stringify({ categories: props.itin });
        console.log(categories);
        const res = await axios.post('/categories/plan-info', categories, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          crossdomain: true
        });
        console.log(res);
        setPlan(res.data.message);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPlanInfo();
  }, [props.itin]);

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
    console.log(props);

    /* TODO: POST itin data to backend */

    props.history.push('/checkout');
  };

  // const display = value => {
  //   const id = '#' + value.slug;
  //   const getElem = document.querySelector(`${id}`);
  //   if (getElem.style.position === 'relative') {
  //     getElem.style.position = 'absolute';
  //     getElem.style.opacity = '0';
  //     getElem.style.transition = 'all 0s linear';
  //   } else {
  //     getElem.style.position = 'relative';
  //     getElem.style.opacity = '1';
  //     getElem.style.transition = 'all 0.3s linear';
  //   }
  // };

  let planList =
    Object.keys(plan).length > 0
      ? Object.entries(plan).map(([slug, data]) => {
          console.log(data);
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
      <div className="btn" style={{ marginRight: 10 }} onClick={handleSave}>
        Save
      </div>
      <div className="btn" onClick={handleCheckout}>
        Save &amp; Checkout
      </div>
    </div>
  );

  return (
    <div className="container" style={{ padding: '1.5em 0' }}>
      <Link to="/">&lt;&lt;&lt; Continue planning</Link>
      <h5>Your itinerary</h5>
      <div className="dropdownItin">
        {planList === null ? <p> You haven't make any plans yet </p> : null}
        <ul className="collapsible">{planList}</ul>
        <br />
        {planList === null ? null : buttons}
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
