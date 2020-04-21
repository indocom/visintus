import React, { useState } from 'react';
import M from 'materialize-css';
import { useMutation } from 'react-query';

import { client } from '~/utils/client';
import { API_FILE_UPLOAD } from '~/constants/api-url';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [upsert] = useMutation(postFile, {
    onSuccess: data => {
      setImageUrl(data?.image?.url);
    }
  });

  function postFile(data) {
    return client(API_FILE_UPLOAD, {
      file: data,
      showError: true
    });
  }

  const checkMimeType = e => {
    let files = e.target.files;
    let err = '';
    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    for (let x = 0; x < files.length; x++) {
      if (!types.includes(files[x].type)) {
        err += files[x].type + ' is not a supported format\n';
      }
    }

    if (err !== '') {
      // if message not same old that mean has error
      e.target.value = null; // discard selected file
      M.toast({
        html: `<div>${err}</div>`,
        classes: 'red rounded center top'
      });
      return false;
    }
    return true;
  };

  const handleSelectFile = e => {
    setSelectedFile(null);
    if (checkMimeType(e)) {
      setSelectedFile(e.target.files[0]);
      if (!selectedFile) {
        M.toast({
          html: '<div>Remember to save!</div>',
          classes: 'amber rounded center top'
        });
      }
    }
  };

  const handleFileUpload = async e => {
    e.preventDefault();

    if (!selectedFile) {
      M.toast({
        html: '<div>No valid file chosen yet!</div>',
        classes: 'red rounded center top'
      });
      return;
    }

    const data = new FormData();
    data.append('file', selectedFile);

    upsert(data);
  };

  const FileUploadForm = () => {
    return (
      <form
        style={{ padding: '15px 15px 0', backgroundColor: '#eee' }}
        onSubmit={handleFileUpload}
      >
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleSelectFile}
          style={{ display: 'none' }}
        />
        <span>
          <label
            htmlFor="file-upload"
            style={{ color: 'white', fontSize: 'inherit' }}
            className="btn"
          >
            Insert picture
          </label>
        </span>
        <span style={{ padding: 15 }}>{selectedFile && selectedFile.name}</span>
        <input
          type="submit"
          className="btn"
          value="save"
          style={{ float: 'right' }}
        />
      </form>
    );
  };

  return [imageUrl, FileUploadForm];
};

export default FileUpload;
