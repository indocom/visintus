import React, { useState } from 'react';
import useMutation from '../../../hooks/useMutation';
import M from 'materialize-css';

const FileUpload = ({ endpoint }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [
    { response: imageURL, error: mutationError },
    upsertData
  ] = useMutation();

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
    console.log(selectedFile);
  };

  const handleFileUpload = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', selectedFile);

    await upsertData({
      method: 'post',
      endpoint,
      data,
      dataType: 'application/octet-stream'
    });

    if (mutationError) {
      M.toast({
        html: `<div>Image failed to upload!</div><div> ${e}! </div>`,
        classes: 'red rounded center top'
      });
    } else if (!selectedFile) {
      M.toast({
        html: '<div>No valid file chosen yet!</div>',
        classes: 'red rounded center top'
      });
    } else {
      M.toast({
        html: '<div>Image uploaded!</div>',
        classes: 'green rounded center top'
      });
    }
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

  return [imageURL, FileUploadForm];
};

export default FileUpload;
