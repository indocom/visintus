import React, { Component, useEffect, useState } from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, queryCache } from 'react-query';

import FileUpload from './utils/FileUpload';
import { client } from '~/hooks/client';
import { QUERY_KEY_ADMIN_CATEGORY } from '~/constants/query-keys';
import { API_ADMIN_CATEGORY } from '~/constants/api-url';

const Category = props => {
  const {
    data: categories,
    status: fetchStatus,
    error: fetchError
  } = useQuery(QUERY_KEY_ADMIN_CATEGORY, () => client(API_ADMIN_CATEGORY));

  const [remove] = useMutation(handleRemove, {
    onSuccess: () => queryCache.refetchQueries(QUERY_KEY_ADMIN_CATEGORY)
  });

  function handleRemove(slug) {
    client(API_ADMIN_CATEGORY + `/${slug}`, {
      method: 'DELETE',
      showSuccess: true,
      showError: true
    });
  }

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
              <button className="btn red" onClick={() => remove(category.slug)}>
                Remove
              </button>
            </div>
          </li>
        );
      })
    ) : (
      <div className="center">No data yet :(</div>
    );

  if (fetchStatus === 'loading') return null;
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
  const [logoURL, FileUploadForm] = FileUpload();

  const [upsert] = useMutation(postUpdate, {
    onSuccess: () => queryCache.refetchQueries(QUERY_KEY_ADMIN_CATEGORY)
  });

  function postUpdate(data) {
    client(API_ADMIN_CATEGORY + `/${endpoint}`, {
      body: data,
      showSuccess: true,
      showError: true
    });
  }

  const title = props.slug === '' ? 'Add Category' : 'Update Category';
  const endpoint = props.slug === '' ? '' : `/${props.slug}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async e => {
    if (!logoURL && !props.data.image_url) {
      e.preventDefault();
      M.toast({
        html: `<div>Please upload image first!</div>`,
        classes: 'red rounded center top'
      });
      return;
    }

    const data = {
      category: {
        name,
        logo_url: !logoURL ? props.data.logo_url : logoURL
      }
    };

    upsert(data);
  };

  return (
    <>
      <h5 className="grey-text text-darken-3">{title}</h5>

      <FileUploadForm />

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
