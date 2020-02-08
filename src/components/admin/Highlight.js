import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import M from 'materialize-css';

const Highlight = props => {
  const [highlights, setHighlights] = useState([]);
  useEffect(() => {
    async function FetchAllHighlights() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/admin/highlights', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: `${token}`
          },
          crossdomain: true
        });
        setHighlights(res.data.message);
        // setIsAuthorized(true);
      } catch (e) {
        console.log(e);
        // setIsAuthorized(false);
      }
    }
    FetchAllHighlights();
  }, [highlights.length]);

  const handleRemove = async id => {
    const token = localStorage.getItem('token');
    await axios
      .delete(`/admin/highlights/${id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: `${token}`
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
    hyperlink: '',
    selectedFile: null,
    token: localStorage.getItem('token') || ''
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

  handleSelectFile = e => {
    console.log(e.target.files[0]);
    this.setState({
      selectedFile: e.target.files[0]
    });
  };

  handleFileUpload = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    try {
      const res = await axios.post('/images/upload', data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: `${this.state.token}`
        },
        crossdomain: true
      });
      console.log(res);
      this.setState({ image_url: res.data.message });
      M.toast({
        html: '<div>Image uploaded!</div>',
        classes: 'teal rounded center top'
      });
    } catch (e) {
      console.log('bangke');
      console.log(e);
      M.toast({
        html: `<div>Image failed to upload!</div><div> ${e}! </div>`,
        classes: 'red rounded center top'
      });
    }
  };

  handleSubmit = async e => {
    const data = JSON.stringify({
      highlight: this.state
    });

    await axios
      .post('/admin/highlights' + this.endpoint, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: `${this.state.token}`
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
        <h5 className="grey-text text-darken-3">{this.title}</h5>
        <form
          style={{ padding: 15, backgroundColor: '#eee' }}
          onSubmit={this.handleFileUpload}
        >
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input
                type="file"
                accept="image/*"
                onChange={this.handleSelectFile}
              />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="Insert file here"
              />
            </div>
            <input type="submit" className="btn" value="save" />
          </div>
        </form>

        <form
          onSubmit={this.handleSubmit}
          style={{ padding: 15, backgroundColor: '#eee' }}
        >
          {this.props.slug !== '' && (
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
                disabled
              />
            </div>
          )}

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
    <>
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
    </>
  );
};
