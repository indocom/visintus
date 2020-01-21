import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

const Highlight = props => {
  const [highlights, setHighlights] = useState([]);
  useEffect(() => {
    async function FetchAllHighlights() {
      let { data } = await axios
        .get('/highlights')
        .catch(err => console.log(err));
      console.log(data);
      if (data) {
        if (!data.message) return;
        setHighlights(data.message);
      } else {
        console.log(`Error in loading /pages/highlights`);
      }
    }
    FetchAllHighlights();
  }, [highlights.length]);

  const handleRemove = async id => {
    const data = JSON.stringify({
      authToken: 'visintus'
    });
    console.log(data);
    await axios
      .delete(`/highlights/${id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        crossdomain: true
      })
      .then(res => res.status === 200 && setHighlights([]))
      .catch(err => console.log(err));
  };

  const highlightsList =
    highlights.length > 0 ? (
      highlights.map((highlight, index) => {
        return (
          <li key={index} style={{ minHeight: 50 }}>
            <span style={{ fontSize: '1.2em' }}>{highlight.image_url}</span>
            <div className="right">
              <button
                data-target="update"
                className="btn"
                onClick={() =>
                  props.handleUpsert(highlight._id, {
                    hyperlink: highlight.hyperlink,
                    image_url: highlight.image_url,
                    description: highlight.description
                  })
                }
              >
                Update
              </button>
              <button
                className="btn red"
                onClick={() => handleRemove(highlight._id)}
              >
                Remove
              </button>
            </div>
            <p>{highlight.hyperlink}</p>
            <p>{highlight.description}</p>
          </li>
        );
      })
    ) : (
      <div className="center">No data yet :(</div>
    );

  return <ul>{highlightsList}</ul>;
};

class UpsertHighlight extends Component {
  state = {
    image_url: '',
    description: '',
    hyperlink: ''
  };

  title = this.props.slug === '' ? 'Add Highlight' : 'Update Highlight';
  endpoint = this.props.slug === '' ? '' : `/${this.props.slug}`;

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      image_url: this.props.data.image_url,
      hyperlink: this.props.data.hyperlink,
      description: this.props.data.description
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = async e => {
    const data = JSON.stringify({
      authToken: 'visintus',
      highlight: this.state
    });
    console.log(data);

    await axios
      .post('/highlights' + this.endpoint, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
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
            <label htmlFor="image_url" className="active">
              Image URL
            </label>
            <input
              type="text"
              id="image_url"
              value={this.state.image_url}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="hyperlink" className="active">
              Highlight hyperlink
            </label>
            <input
              type="text"
              id="hyperlink"
              value={this.state.hyperlink}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="description" className="active">
              Description
            </label>
            <input
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

export default props => {
  let [isActive, setIsActive] = useState(false);
  let [slug, setSlug] = useState(''); //'' -> add highlight
  let [data, setData] = useState({
    hyperlink: '',
    image_url: '',
    description: ''
  });
  let handleUpsert = (slug, data) => {
    setIsActive(!isActive);
    setSlug(slug);
    setData(data);
  };

  return (
    <div className="container">
      <h4>Highlight Admin Page</h4>
      <div
        className="btn right"
        onClick={() => {
          props.history.push('/admin');
        }}
      >
        Back to admin dashboard
      </div>

      {/* Input form to add or update. slug property to determine API endpoint */}
      {isActive && (
        <UpsertHighlight
          slug={slug}
          data={data}
          closeForm={() => setIsActive(!isActive)}
        />
      )}
      {!isActive && (
        <button
          onClick={() =>
            handleUpsert('', {
              hyperlink: '',
              image_url: '',
              description: ''
            })
          }
          className="btn"
        >
          Add highlight
        </button>
      )}
      <Highlight handleUpsert={handleUpsert} baseURL={props.match.path} />
    </div>
  );
};
