import React, { Component, useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import useMutation from '../../hooks/useMutation';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Category = props => {
  const [
    { response: categories, loading: fetchLoading, error: fetchError },
    doFetch
  ] = useFetch({ endpoint: '/admin/categories' });
  const [{ error: mutationError }, upsertData] = useMutation();

  const handleRemove = async slug => {
    upsertData({
      method: 'delete',
      endpoint: `/admin/categories/${slug}`
    });
    doFetch(true);
    if (mutationError) {
      M.toast({
        html: `<div>Failed to remove!</div><div> ${mutationError}! </div>`,
        classes: 'red rounded center top'
      });
    }
  };

  const categoriesList =
    categories && categories.length > 0 ? (
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

  if (fetchLoading) return null;
  return !fetchError ? (
    <ul>{categoriesList}</ul>
  ) : (
    <p>
      Error fetching data! Check your credentials or contact your administrator
    </p>
  );
};

const UpsertCategory = props => {
  const [name, setName] = useState(props.data.name);
  const [description, setDescription] = useState(props.data.description);
  const [selectedFile, setSelectedFile] = useState(null);
  const [
    { response: logoURL, error: mutationError },
    upsertData
  ] = useMutation();

  const title = props.slug === '' ? 'Add Category' : 'Update Category';
  const endpoint = props.slug === '' ? '' : `/${props.slug}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectFile = e => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    M.toast({
      html: '<div>Remember to save!</div>',
      classes: 'amber rounded center top'
    });
  };

  const handleFileUpload = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', selectedFile);

    await upsertData({
      method: 'post',
      endpoint: `/images/upload`,
      data
    });

    if (mutationError) {
      M.toast({
        html: `<div>Image failed to upload!</div><div> ${e}! </div>`,
        classes: 'red rounded center top'
      });
    } else {
      M.toast({
        html: '<div>Image uploaded!</div>',
        classes: 'green rounded center top'
      });
    }
  };

  const handleSubmit = async e => {
    if (!logoURL && !props.data.image_url) {
      e.preventDefault();
      M.toast({
        html: `<div>Please upload image first!</div>`,
        classes: 'red rounded center top'
      });
      return;
    }

    const data = JSON.stringify({
      category: {
        name,
        logo_url: !props.data.logo_url ? logoURL : props.data.logo_url
      }
    });
    console.log(data);

    await upsertData({
      method: 'post',
      endpoint: '/admin/categories' + endpoint,
      data
    });
  };

  return (
    <>
      <h5 className="grey-text text-darken-3">{title}</h5>
      <form
        style={{ padding: 15, backgroundColor: '#eee' }}
        onSubmit={handleFileUpload}
      >
        <div className="file-field input-field">
          <div className="btn">
            <span>Insert picture here</span>
            <input type="file" accept="image/*" onChange={handleSelectFile} />
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
        onSubmit={handleSubmit}
        style={{ padding: 15, backgroundColor: '#eee' }}
      >
        <div className="input-field">
          <label htmlFor="name" className="active">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        {props.slug && (
          <div className="input-field">
            <label htmlFor="logo_url" className="active">
              Logo URL
            </label>
            <input
              type="text"
              id="logo_url"
              value={props.data.logo_url}
              required
              disabled
            />
          </div>
        )}

        <div className="input-field">
          <label htmlFor="description" className="active">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button className="btn">{title}</button>
        <div
          className="btn"
          onClick={() => {
            props.closeForm();
          }}
        >
          Cancel
        </div>
      </form>
    </>
  );
};

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
