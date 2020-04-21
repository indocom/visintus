import React, { useState, useEffect } from 'react';
import { useMutation, queryCache } from 'react-query';

import FileUpload from '../../utils/FileUpload';
import { client } from '~/utils/client';
import { QUERY_KEY_ADMIN_CATEGORY_DETAILS } from '~/constants/query-keys';
import { API_ADMIN_CATEGORY } from '~/constants/api-url';

const MAX_DESC_LENGTH = 200;

const UpsertReps = ({ detailInfo, slug, detailType, closeForm }) => {
  const [state, setState] = useState(detailInfo);
  const [imageURL, FileUploadForm] = FileUpload();

  const [upsert] = useMutation(postUpdate, {
    onSuccess: () => {
      queryCache.refetchQueries(
        query => query.queryKey === QUERY_KEY_ADMIN_CATEGORY_DETAILS
      );
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

    if (!imageURL && !detailInfo.image_url) {
      M.toast({
        html: `<div>Please upload image first!</div>`,
        classes: 'red rounded center top'
      });
      return;
    }

    // copy to temp var to avoid unwanted mutation. just to be safe
    const temp = { ...state };
    delete temp._id;
    temp.photo_url = !imageURL ? detailInfo.photo_url : imageURL;

    const data = {
      representative: temp
    };

    upsert(data);
  };

  return (
    <>
      <h5 className="grey-text text-darken-3">{title}</h5>

      <FileUploadForm />

      {/* <img src={state.photo_url}></img> */}
      <form
        onSubmit={handleSubmit}
        style={{ padding: 15, backgroundColor: '#eee' }}
      >
        <div className="input-field">
          <label htmlFor="name" className="active">
            Representative Name
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

        {detailInfo._id && (
          <div className="input-field">
            <label htmlFor="photo_url" className="active">
              Photo URL
            </label>
            <input
              type="text"
              id="photo_url"
              value={state.photo_url}
              onChange={handleChange}
              required
              disabled
            />
          </div>
        )}

        <button className="btn">{title}</button>
        <div className="btn" onClick={closeForm}>
          Cancel
        </div>
      </form>
    </>
  );
};

export default UpsertReps;
