import React, { Component, useState } from 'react';
import axios from 'axios';

const PlanDetails = ({ plans, handleUpsert, slug, setDetails }) => {
  const handleRemove = async _id => {
    const data = JSON.stringify({
      authToken: 'visintus'
    });
    const token = localStorage.getItem('token');
    await axios
      .delete(`/categories/${slug}/plans/${_id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        crossdomain: true
      })
      .then(res => res.status == 200 && setDetails([]))
      .catch(err => console.log(err));
  };

  const planList =
    plans && plans.length && plans.length > 0 ? (
      plans.map((plan, index) => {
        return (
          <li key={index} style={{ minHeight: 50 }}>
            <span style={{ fontSize: '1.2em' }}>{plan.name}</span>
            <div className="right">
              <button
                data-target="update"
                className="btn"
                onClick={() => handleUpsert(plan)}
              >
                Update
              </button>
              <button
                className="btn red"
                onClick={() => handleRemove(plan._id)}
              >
                Remove
              </button>
            </div>
            <p>{plan.description}</p>
          </li>
        );
      })
    ) : (
      <div className="center">No data yet :(</div>
    );

  return <ul>{planList}</ul>;
};

class UpsertPlan extends Component {
  state = {
    _id: '',
    name: '',
    description: ''
  };

  title = this.props.planData._id === '' ? 'Add Plan' : 'Update Plan';
  endpoint = this.props.planData._id === '' ? '' : `/${this.props.planData._id}`;

  componentDidMount() {
    this.setState(this.props.planData);
    window.scrollTo(0, 0);
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = async e => {
    const data = JSON.stringify({
      authToken: 'visintus',
      plan: this.state
    });
    console.log(data);
    const token = localStorage.getItem('token');
    await axios
      .post(`/categories/${this.props.slug}/plans` + this.endpoint, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        crossdomain: true
      })
      .catch(err => console.log(err));
  };
  render() {
    // const { auth, authError } = this.props
    // if (auth.uid) return <Redirect to='/admin' />
    return (
      <>
        <form
          onSubmit={this.handleSubmit}
          style={{ padding: 15, backgroundColor: '#eee' }}
        >
          <h5 className="grey-text text-darken-3">{this.title}</h5>
          <div className="input-field">
            <label htmlFor="name" className="active">
              Plan Name
            </label>
            <input
              type="text"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="description" className="active">
              Description
            </label>
            <textarea
              style={{ minHeight: 100 }}
              type="text"
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <button className="btn">{this.title}</button>
          <div
            className="btn"
            onClick={() => {
              this.props.closeForm();
            }}
          >
            Cancel
          </div>
        </form>
      </>
    );
  }
}

export default ({ plans, slug, setDetails }) => {
  let [isActive, setIsActive] = useState(false);
  let [planData, setPlanData] = useState({
    _id: '',
    name: '',
    description: ''
  }); //'null -> add plan

  const handleUpsert = planData => {
    setIsActive(!isActive);
    setPlanData(planData);
  };
  return (
    <>
      <h5 id="header">
        Plan Details
        <button
          onClick={() =>
            handleUpsert({
              _id: '',
              name: '',
              description: ''
            })
          }
          className="btn btn-small right"
        >
          Add Plan
        </button>
      </h5>
      {/* Input form to add or update. slug property to determine API endpoint */}
      {isActive && (
        <UpsertPlan
          planData={planData}
          slug={slug}
          closeForm={() => setIsActive(!isActive)}
        />
      )}
      <PlanDetails
        plans={plans}
        slug={slug}
        handleUpsert={handleUpsert}
        setDetails={setDetails}
      />
    </>
  );
};
