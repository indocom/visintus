import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import M from 'materialize-css';
import { useQuery } from 'react-query';
import { client } from 'hooks/client';
import { API_CATEGORIES_PLANINFO, API_CHECKOUT } from 'constants/api-url';
import { QUERY_KEY_PLAN_INFO } from 'constants/query-keys';

const Checkout = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [remarks, setRemarks] = useState('');

  const { status: itinStatus, data: itin, error: itinError } = useQuery(
    QUERY_KEY_PLAN_INFO,
    () =>
      client(API_CATEGORIES_PLANINFO, {
        body: {
          categories: props.itin
        }
      })
  );

  useEffect(() => {
    const elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, {
      disableWeekends: true,
      minDate: new Date()
    });
  }, [props]);

  const handleSubmit = e => {
    e.preventDefault();

    let order = {
      categories: props.itin,
      orderInfo: {
        name,
        email,
        visitDate,
        organization,
        remarks
      }
    };

    client(API_CHECKOUT, {
      body: order,
      showSuccess: true,
      showError: true,
      redirectTo: '/',
      onSuccess: () => localStorage.removeItem('plan-info')
    });
  };

  if (!itin || Object.keys(itin).length < 1) {
    return (
      <div
        className="container center"
        style={{ margin: 'auto', backgroundColor: 'rgba(0,0,0,0)' }}
      >
        <div style={{ minHeight: 50 }}></div>
        <h5>You haven't make any plan to visit NUS!</h5>
        <h6>Ready to start planning your visit? We'll help!</h6>
        <h6>
          P.S: For every visit you make to NUS with us, we will need to give you
          a brief introduction to our organization.{' '}
        </h6>
        <div style={{ minHeight: 30 }}></div>
        <Link to="/" className="btn btn-large">
          Plan now!
        </Link>
      </div>
    );
  }

  const planList = Object.entries(itin).map(([slug, data]) => {
    return (
      <Fragment key={slug}>
        <Link
          to={`/categories/${slug}`}
          style={{
            textTransform: 'uppercase',
            fontWeight: 500,
            letterSpacing: '0.001em'
          }}
        >
          {data.name}
        </Link>
        <div>
          <ul>
            {data.plans.length > 0 &&
              data.plans.map(plan => (
                <li key={plan._id}>
                  <p>&nbsp;-&nbsp; {plan.name}</p>
                </li>
              ))}
          </ul>
        </div>
      </Fragment>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <h5>CHECKOUT</h5>
        <form className="grey lighten-4" onSubmit={handleSubmit}>
          <div className="col s12 l8" style={{ padding: '1.5em 1.5em 1em' }}>
            <h5>Contacts</h5>
            <div className="input-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                required
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <label htmlFor="visitDate">Visit Date (YYYY-MM-DD) </label>
              <input
                type="text"
                id="visitDate"
                required
                className="datepicker"
                onChange={e => setVisitDate(e.target.value)}
              />
            </div>
            <div className="input-field">
              <label htmlFor="organization">Organization</label>
              <input
                type="text"
                id="organization"
                required
                onChange={e => setOrganization(e.target.value)}
              />
            </div>
            <div className="input-field">
              <label htmlFor="remarks">Additional Remarks</label>
              <textarea
                className="materialize-textarea"
                id="remarks"
                onChange={e => setRemarks(e.target.value)}
              />
            </div>
          </div>
          <div
            className="col s12 l4 white"
            style={{ padding: '0 1.5em 1.5em' }}
          >
            <h5
              style={{
                borderBottom: '1px solid rgba(0,0,0,0.4)',
                paddingBottom: '0.5em'
              }}
            >
              Plan Summary
            </h5>
            {planList}
          </div>
          <div className="col s12" style={{ padding: '1em 1.5em' }}>
            <button className="btn btn-large z-depth-0">
              Book your visit!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    itin: state.plan.itin
  };
};

export default connect(mapStateToProps, null)(Checkout);
