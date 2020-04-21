import React from 'react';
import { useMutation, queryCache } from 'react-query';

import { client } from '~/utils/client';
import { QUERY_KEY_ADMIN_CATEGORY_DETAILS } from '~/constants/query-keys';
import { API_ADMIN_CATEGORY } from '~/constants/api-url';

const DetailsView = ({ details, slug, detailType, handleUpsert }) => {
  const [remove] = useMutation(handleRemove, {
    onSuccess: () => queryCache.refetchQueries(QUERY_KEY_ADMIN_CATEGORY_DETAILS)
  });

  function handleRemove(_id) {
    client(API_ADMIN_CATEGORY + `/${slug}/${detailType}/${_id}`, {
      method: 'DELETE',
      showSuccess: true,
      showError: true
    });
  }

  const detailsList =
    details?.length && details.length > 0 ? (
      details.map((detail, index) => {
        return (
          <li key={index} style={{ minHeight: 50 }}>
            <span style={{ fontSize: '1.2em' }}>{detail.name}</span>
            <div className="right">
              <button
                data-target="update"
                className="btn"
                onClick={() => handleUpsert(detail)}
              >
                Update
              </button>
              <button className="btn red" onClick={() => remove(detail._id)}>
                Remove
              </button>
            </div>
            <p>{detail.description}</p>
          </li>
        );
      })
    ) : (
      <div className="center">No data yet!</div>
    );

  return <ul>{detailsList}</ul>;
};

export default DetailsView;
