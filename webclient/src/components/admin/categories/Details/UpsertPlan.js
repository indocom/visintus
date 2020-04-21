import React, { useState, useEffect } from 'react';
import { useMutation, queryCache } from 'react-query';

import { client } from '~/hooks/client';
import { QUERY_KEY_ADMIN_CATEGORY_DETAILS } from '~/constants/query-keys';
import { API_ADMIN_CATEGORY } from '~/constants/api-url';

const MAX_DESC_LENGTH = 200;

const UpsertPlan = ({ detailInfo, slug, detailType, closeForm }) => {
  const [state, setState] = useState(detailInfo);

  const [upsert] = useMutation(postUpdate, {
    onSuccess: () => {
      queryCache.refetchQueries(QUERY_KEY_ADMIN_CATEGORY_DETAILS);
      closeForm();
    }
  });

  function postUpdate(data) {
    return client(API_ADMIN_CATEGORY + `/${slug}/${detailType}/${endpoint}`, {
      body: data,
      showSuccess: true,
      showError: true
    });
  }

  const title =
    detailInfo._id === '' ? `Add ${detailType}` : `Update ${detailType}`;
  const endpoint = detailInfo._id === '' ? '' : `${detailInfo._id}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = e => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // copy to temp var to avoid unwanted mutation. just to be safe
    const temp = { ...state };
    delete temp._id;

    const data = {
      plan: temp
    };

    upsert(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: 15, backgroundColor: '#eee' }}
    >
      <h5 className="grey-text text-darken-3">{title}</h5>
      <div className="input-field">
        <label htmlFor="name" className="active">
          Plan Name
        </label>
        <input
          type="text"
          id="name"
          value={state.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-field">
        <label htmlFor="description" className="active">
          Description (max {MAX_DESC_LENGTH} chars)
        </label>
        <textarea
          style={{ minHeight: 100 }}
          className="materialize-textarea"
          type="text"
          id="description"
          value={state.description}
          maxLength={MAX_DESC_LENGTH}
          onChange={handleChange}
        />
      </div>
      <button className="btn">{title}</button>
      <div className="btn" onClick={closeForm}>
        Cancel
      </div>
    </form>
  );
};

export default UpsertPlan;
