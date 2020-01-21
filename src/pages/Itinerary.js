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
    const fetchPlanInfo = async () => {
      try {
        let categories = JSON.stringify({ categories: props.itin });
        const res = await axios.post('/plan-info', categories, {
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
  console.log(plan);
  const handleRemovePlan = (id, slug) => {
    props.removePlan(id, slug);
  };

  const handleCheckout = e => {
    e.preventDefault();
    console.log(props);

    /* TODO: POST itin data to backend */

    props.history.push('/checkout');
  };

  const display = value => {
    const id = '#' + value.slug;
    const getElem = document.querySelector(`${id}`);
    if (getElem.style.position === 'relative') {
      getElem.style.position = 'absolute';
      getElem.style.opacity = '0';
      getElem.style.transition = 'all 0s linear';
    } else {
      getElem.style.position = 'relative';
      getElem.style.opacity = '1';
      getElem.style.transition = 'all 0.3s linear';
    }
  };

  const handleSave = e => {
    M.toast({ html: 'Data saved!', classes: 'teal rounded center top' });
  };

  const handleRemoveCategory = slug => {
    props.removeCategory(slug);
  };

  let planList =
    Object.keys(plan).length > 0 ? (
      Object.entries(plan).map(([slug, data]) => {
        console.log(data);
        return (
          <Fragment key={slug}>
            <div className="dropdownItin__title">
              <h6 className="red-text">{data.name}</h6>
              <button onClick={() => display({ slug })}>
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>
            <div className="dropdownItin__content" id={slug}>
              <ul>
                {data.plans.length > 0 ? (
                  data.plans.map(plan => (
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
                ) : (
                  <>
                    <p>You have deleted all plans for this area.</p>
                    <div>
                      You can either find out more{' '}
                      <Link to={`/category/${slug}`}>
                        interesting items here
                      </Link>{' '}
                      or delete{' '}
                      <div
                        style={{
                          color: '#039be5',
                          cursor: 'pointer',
                          display: 'inline'
                        }}
                        onClick={() => handleRemoveCategory(slug)}
                      >
                        the area
                      </div>{' '}
                      from your itinerary
                    </div>
                  </>
                )}
              </ul>
            </div>
          </Fragment>
        );
      })
    ) : (
      <p> You haven't make any plans yet </p>
    );

  return (
    <div className="container" style={{ padding: '1.5em 0' }}>
      <Link to="/">&lt;&lt;&lt; Continue planning</Link>
      <h5>Your itinerary</h5>
      <div className="dropdownItin">
        {planList}
        <br />
        <div className="dropdownButtonContainer">
          <div className="btn" style={{ marginRight: 10 }} onClick={handleSave}>
            Save
          </div>
          <div className="btn" onClick={handleCheckout}>
            Save &amp; Checkout
          </div>
        </div>
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
