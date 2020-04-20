import React, { Component, useState } from 'react';
import useMutation from '~/hooks/useMutation';
import M from 'materialize-css';
import axios from 'axios';

const BannerDetails = ({ banners, slug, setDetails }) => {
  const [isActive, setIsActive] = useState(false);
  const handleRemove = async (id, slug) => {
    const token = localStorage.getItem('token');
    await axios
      .delete(`/api/admin/categories/${slug}/banners/${id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        crossdomain: true
      })
      .then(res => res.status === 200 && setDetails([]))
      .catch(err => console.log(err));
  };

  const handleAdd = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <h5>
        Banner Details{' '}
        <div className="btn right btn-small" onClick={handleAdd}>
          Add banner
        </div>
      </h5>
      {isActive && <UpsertBanner slug={slug} />}
      <ul>
        {banners &&
          banners.length &&
          banners.map((detail, index) => (
            <li key={index} style={{ minHeight: 50 }}>
              {detail.image_url}
              <div
                className="btn btn-small right red"
                onClick={() => handleRemove(detail._id, slug)}
              >
                Remove
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

const UpsertBanner = props => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [
    { response: imageURL, error: mutationError },
    upsertData
  ] = useMutation();

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
    e.preventDefault();
    const data = JSON.stringify({
      banner: {
        image_url: imageURL.image.url
      }
    });
    console.log(data);

    await upsertData({
      method: 'post',
      endpoint: `/admin/categories/${props.slug}/banners`,
      data
    });
  };

  return (
    <>
      <h6 className="grey-text text-darken-3">Add Banner</h6>
      <form
        className="white"
        style={{ paddingBottom: 40 }}
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
        className="white"
        style={{ marginTop: -50, marginLeft: 75 }}
        onSubmit={handleSubmit}
      >
        <button className="btn ">Add Banner</button>
      </form>
    </>
  );
};

export default BannerDetails;
