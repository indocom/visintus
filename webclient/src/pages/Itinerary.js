import React, { useEffect } from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import { useQuery, queryCache } from 'react-query';

import { client } from '~/utils/client';
import { QUERY_KEY_PLAN_INFO } from '~/constants/query-keys';
import { API_CATEGORIES_PLANINFO } from '~/constants/api-url';

import '../css/itin.css';
import { useItin } from '~/context/itin';

function Itinerary(props) {
  const { itin, removePlan, removeCategory } = useItin();
  const { status: planStatus, data: plan, error: planError } = useQuery(
    QUERY_KEY_PLAN_INFO,
    () =>
      client(API_CATEGORIES_PLANINFO, {
        body: {
          categories: itin.itin
        }
      })
  );

  useEffect(() => {
    let collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible, {
      accordion: false
    });
  }, []);

  const handleRemoveCategory = slug => {
    const newPlan = { ...plan };
    delete newPlan[slug];

    // update cache data without refreshing with one of them deleted.
    queryCache.setQueryData(QUERY_KEY_PLAN_INFO, newPlan);

    // update state in context
    removeCategory(slug);
  };

  const handleRemovePlan = (id, slug) => {
    const newPlan = {
      ...plan,
      [slug]: {
        ...plan[slug],
        plans: [...plan[slug].plans].filter(plan => plan._id !== id)
      }
    };

    // update cache data without refreshing with one of them deleted.
    queryCache.setQueryData(QUERY_KEY_PLAN_INFO, newPlan);

    // update state in context
    removePlan(id, slug);
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
    plan && Object.keys(plan).length > 0
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
}

export default Itinerary;
