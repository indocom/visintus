import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import useMutation from '../../hooks/useMutation';
import M from 'materialize-css';
import FileUpload from './FileUpload';

const Highlight = props => {
  const [
    { response: highlights, loading: fetchLoading, error: fetchError },
    doFetch
  ] = useFetch({ endpoint: '/admin/highlights' });
  const [{ error: mutationError }, upsertData] = useMutation();

  const handleRemove = async id => {
    upsertData({
      method: 'delete',
      endpoint: `/admin/highlights/${id}`
    });
    doFetch(true);
    if (mutationError) {
      M.toast({
        html: `<div>Failed to remove!</div><div> ${mutationError}! </div>`,
        classes: 'red rounded center top'
      });
    }
  };

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

  if (fetchLoading) return null;
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
  const [imageURL, FileUploadForm] = FileUpload({
    endpoint: '/images/upload'
  });
  const [{ error: mutationError }, upsertData] = useMutation();

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

    const data = JSON.stringify({
      highlight: {
        image_url: !imageURL ? props.data.image_url : imageURL,
        description,
        hyperlink
      }
    });
    console.log(data);

    await upsertData({
      method: 'post',
      endpoint: '/admin/highlights' + endpoint,
      data
    });

    if (mutationError) {
      M.toast({
        html: `<div>${title} failed</div><div> ${mutationError}! </div>`,
        classes: 'red rounded center top'
      });
    } else {
      M.toast({
        html: `<div>${title} successful!</div>`,
        classes: 'green rounded center top'
      });
    }
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
