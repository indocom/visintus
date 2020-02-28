import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import M from 'materialize-css';

const Checkout = props => {
  const [itin, setItin] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [remarks, setRemarks] = useState('');
  console.log(itin);

  useEffect(() => {
    const fetchPlanInfo = async () => {
      try {
        let categories = JSON.stringify({ categories: props.itin });
        const res = await axios.post('categories/plan-info', categories, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          crossdomain: true
        });
        console.log(res);
        setItin(res.data.message);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPlanInfo();
  }, [props.itin]);

  useEffect(() => {
    const elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, {
      disableWeekends: true,
      minDate: new Date()
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(props, name, email, visitDate, organization, remarks);

    let order = JSON.stringify({
      categories: props.itin,
      orderInfo: {
        name,
        email,
        visitDate,
        organization,
        remarks
      }
    });

    const res = axios.post('/checkout', order, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      crossdomain: true
    });

    console.log(res);

    M.toast({
      html: '<h1>Booking successful!</h1>',
      classes: 'teal rounded center top'
    });
    props.history.push('/');
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
              <label htmlFor="visitDate">Visit Date (DD/MM/YYYY) </label>
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
  console.log(state);
  return {
    itin: state.plan.itin
  };
};

export default connect(mapStateToProps, null)(Checkout);
