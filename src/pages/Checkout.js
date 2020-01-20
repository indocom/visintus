import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import M from 'materialize-css';

const Checkout = props => {
  const [itin, setItin] = useState(props.itin);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [remarks, setRemarks] = useState('');
  console.log(itin);

  useEffect(() => {
    const elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, {
      disableWeekends: true
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(props, name, email, visitDate, organization, remarks);
    M.toast({ html: 'Booking saved!', classes: 'teal rounded center top' });
    props.history.push('/');
  };

  if (!itin || Object.keys(itin).length <= 1) {
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

  const planList = Object.entries(props.itin).map(([slug, plans]) => {
    return (
      <Fragment key={slug}>
        <h6 className="red-text">{slug}</h6>
        <div>
          <ul>
            {plans.length > 0 &&
              plans.map(plan => (
                <li key={plan._id}>
                  <p>{plan.name}</p>
                </li>
              ))}
          </ul>
        </div>
      </Fragment>
    );
  });

  return (
    <div className="container">
      <h4>Checkout</h4>
      {planList}
      <h5>Please let us know more about you!</h5>
      <form className="grey lighten-4" onSubmit={handleSubmit}>
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
          <label htmlFor="visitDate">Visit Date</label>
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
        <button className="btn z-depth-0">Book your visit!</button>
      </form>
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
