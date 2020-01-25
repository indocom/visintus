import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Category = props => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function FetchAllCategories() {
      let { data } = await axios
        .get('/categories')
        .catch(err => console.log(err));

      if (data) {
        if (!data.message) return;
        setCategories(data.message);
      } else {
        console.log(`Error in loading /pages/category`);
      }
    }
    FetchAllCategories();
  }, [categories.length]);

  const handleRemove = async slug => {
    const token = localStorage.getItem('token');

    await axios
      .delete(`/categories/${slug}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        crossdomain: true
      })
      .then(res => res.status === 200 && setCategories([]))
      .catch(err => console.log(err));
  };

  const categoriesList =
    categories.length > 0 ? (
      categories.map((category, index) => {
        return (
          <li key={index} style={{ minHeight: 50 }}>
            <Link to={props.baseURL + `/${category.slug}`}>
              <span>{category.name}</span>
            </Link>
            <div className="right">
              <button
                data-target="update"
                className="btn"
                onClick={() =>
                  props.handleUpsert(category.slug, {
                    name: category.name,
                    logo_url: category.logo_url,
                    description: category.description
                  })
                }
              >
                Update
              </button>
              <button
                className="btn red"
                onClick={() => handleRemove(category.slug)}
              >
                Remove
              </button>
            </div>
          </li>
        );
      })
    ) : (
      <div className="center">No data yet :(</div>
    );

  return <ul>{categoriesList}</ul>;
};

class UpsertCategory extends Component {
  state = {
    name: '',
    logo_url: '',
    description: ''
  };

  title = this.props.slug === '' ? 'Add Category' : 'Update Category';
  endpoint = this.props.slug === '' ? '' : `/${this.props.slug}`;

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      name: this.props.data.name,
      logo_url: this.props.data.logo_url
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
      category: this.state
    });
    console.log(data);

    const token = localStorage.getItem('token');

    await axios
      .post('/categories' + this.endpoint, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: `${token}`
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
              Category Name
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
            <label htmlFor="logo_url" className="active">
              Logo URL
            </label>
            <input
              type="text"
              id="logo_url"
              value={this.state.logo_url}
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
  let [slug, setSlug] = useState(''); //'' -> add category
  let [data, setData] = useState({
    name: '',
    logo_url: '',
    description: ''
  });
  let handleUpsert = (slug, data) => {
    setIsActive(!isActive);
    setSlug(slug);
    setData(data);
  };
  return (
    <>
      <h4>Category Admin Page</h4>
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
        <UpsertCategory
          slug={slug}
          data={data}
          closeForm={() => setIsActive(!isActive)}
        />
      )}
      {!isActive && (
        <button
          onClick={() =>
            handleUpsert('', {
              name: '',
              logo_url: ''
            })
          }
          className="btn"
        >
          Add category
        </button>
      )}
      <Category handleUpsert={handleUpsert} baseURL={props.match.path} />
    </>
  );
};
