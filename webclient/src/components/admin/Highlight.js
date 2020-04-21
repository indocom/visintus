import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, queryCache } from 'react-query';
import M from 'materialize-css';

import FileUpload from './utils/FileUpload';
import { client } from '~/utils/client';
import { QUERY_KEY_ADMIN_HIGHLIGHTS } from '~/constants/query-keys';
import { API_ADMIN_HIGHLIGHTS } from '~/constants/api-url';

const Highlight = props => {
  const {
    data: highlights,
    status: fetchStatus,
    error: fetchError
  } = useQuery(QUERY_KEY_ADMIN_HIGHLIGHTS, () => client(API_ADMIN_HIGHLIGHTS));

  const [remove] = useMutation(handleRemove, {
    onSuccess: () => queryCache.refetchQueries(QUERY_KEY_ADMIN_HIGHLIGHTS)
  });

  function handleRemove(id) {
    client(API_ADMIN_HIGHLIGHTS + `/${id}`, {
      method: 'DELETE',
      showSuccess: true,
      showError: true
    });
  }

  const highlightsList =
    highlights && highlights.length > 0 ? (
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
              <button className="btn red" onClick={() => remove(highlight._id)}>
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

  if (fetchStatus === 'loading') return null;
  return !fetchError ? (
    <ul>{highlightsList}</ul>
  ) : (
    <p>
      Error fetching data! Check your credentials or contact your administrator
    </p>
  );
};

const UpsertHighlight = props => {
  const [description, setDescription] = useState(props.data.description);
  const [hyperlink, setHyperlink] = useState(props.data.hyperlink);
  const [imageURL, FileUploadForm] = FileUpload();

  const [upsert] = useMutation(postUpdate, {
    onSuccess: () => queryCache.refetchQueries(QUERY_KEY_ADMIN_HIGHLIGHTS)
  });

  function postUpdate(data) {
    client(API_ADMIN_HIGHLIGHTS + `${endpoint}`, {
      body: data,
      showSuccess: true,
      showError: true
    });
  }

  const title = props.slug === '' ? 'Add Highlight' : 'Update Highlight';
  const endpoint = props.slug === '' ? '' : `/${props.slug}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async e => {
    if (!imageURL && !props.data.image_url) {
      e.preventDefault();
      M.toast({
        html: `<div>Please upload image first!</div>`,
        classes: 'red rounded center top'
      });
      return;
    }

    const data = {
      highlight: {
        image_url: !imageURL ? props.data.image_url : imageURL,
        description,
        hyperlink
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
        {props.slug && (
          <div className="input-field">
            <label htmlFor="image_url" className="active">
              Image URL
            </label>
            <input
              type="text"
              id="image_url"
              value={props.data.image_url}
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
            value={hyperlink}
            onChange={e => setHyperlink(e.target.value)}
          />
        </div>

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
  let [isActive, setIsActive] = useState(false); // -> is form shown?
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
