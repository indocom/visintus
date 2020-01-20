import React, { Component, useState } from 'react';
import axios from 'axios';

const RepDetails = ({ reps, handleUpsert, slug, setDetails }) => {
  const handleRemove = async _id => {
    const data = JSON.stringify({
      authToken: 'visintus'
    });
    const token = localStorage.getItem('token');
    await axios
      .delete(`/categories/${slug}/representatives/${_id}`, {
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

  const repList =
    reps && reps.length && reps.length > 0 ? (
      reps.map((rep, index) => {
        return (
          <li key={index} style={{ minHeight: 50 }}>
            <span style={{ fontSize: '1.2em' }}>{rep.name}</span>
            <div className="right">
              <button
                data-target="update"
                className="btn"
                onClick={() => handleUpsert(rep)}
              >
                Update
              </button>
              <button className="btn red" onClick={() => handleRemove(rep._id)}>
                Remove
              </button>
            </div>
            <p>{rep.description}</p>
            <p>{rep.photo_url}</p>
          </li>
        );
      })
    ) : (
      <div className="center">No data yet :(</div>
    );

  return <ul>{repList}</ul>;
};

class UpsertRep extends Component {
  state = {
    _id: '',
    name: '',
    description: '',
    photo_url: ''
  };

  title =
    this.props.repData._id === ''
      ? 'Add Representative'
      : 'Update Representative';
  endpoint = this.props.repData._id === '' ? '' : `/${this.props.repData._id}`;

  componentDidMount() {
    this.setState(this.props.repData);
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
      representative: this.state
    });
    console.log(data);
    const token = localStorage.getItem('token');
    await axios
      .post(
        `/categories/${this.props.slug}/representatives` + this.endpoint,
        data,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          crossdomain: true
        }
      )
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
              Representative Name
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
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="photo_url" className="active">
              Photo URL
            </label>
            <input
              type="text"
              id="photo_url"
              value={this.state.photo_url}
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

export default ({ reps, slug, setDetails }) => {
  let [isActive, setIsActive] = useState(false);
  let [repData, setRepData] = useState({
    _id: '',
    name: '',
    description: '',
    photo_url: ''
  }); //'null -> add rep

  const handleUpsert = repData => {
    setIsActive(!isActive);
    setRepData(repData);
  };
  return (
    <>
      <h5 id="header">
        Representatives Details
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
          Add Representative
        </button>
      </h5>
      {/* Input form to add or update. slug property to determine API endpoint */}
      {isActive && (
        <UpsertRep
          repData={repData}
          slug={slug}
          closeForm={() => setIsActive(!isActive)}
        />
      )}
      <RepDetails
        reps={reps}
        slug={slug}
        handleUpsert={handleUpsert}
        setDetails={setDetails}
      />
    </>
  );
};
