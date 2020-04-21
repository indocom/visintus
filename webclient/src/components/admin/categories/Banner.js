import React, { useState, useEffect } from 'react';
import { useMutation, queryCache } from 'react-query';
import M from 'materialize-css';
import axios from 'axios';
import FileUpload from '../utils/FileUpload';
import { client } from '~/utils/client';
import { QUERY_KEY_ADMIN_CATEGORY_DETAILS } from '~/constants/query-keys';
import { API_ADMIN_CATEGORY, API_FILE_UPLOAD } from '~/constants/api-url';

const BannerDetails = ({ details, detailType, slug }) => {
  const [isActive, setIsActive] = useState(false);
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

  const handleAdd = () => setIsActive(!isActive);

  return (
    <>
      <h5>
        Banner Details{' '}
        <div className="btn right btn-small" onClick={handleAdd}>
          Add banner
        </div>
      </h5>
      {isActive && (
        <UpsertBanner
          detailType={detailType}
          slug={slug}
          closeForm={() => setIsActive(false)}
        />
      )}
      <ul>
        {details?.length &&
          details.map((detail, index) => (
            <li key={index} style={{ minHeight: 50 }}>
              {detail.image_url}
              <div
                className="btn btn-small right red"
                onClick={() => remove(detail._id)}
              >
                Remove
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

const UpsertBanner = ({ slug, detailType, closeForm }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadFile] = useMutation(postFile, {
    onSuccess: data => {
      setImageUrl(data?.image?.url);
      queryCache.refetchQueries(QUERY_KEY_ADMIN_CATEGORY_DETAILS);
    }
  });
  const [upsert] = useMutation(postUpdate, {
    onSuccess: () => {
      closeForm();
      queryCache.refetchQueries(QUERY_KEY_ADMIN_CATEGORY_DETAILS);
    }
  });

  function postFile(data) {
    return client(API_FILE_UPLOAD, {
      file: data,
      showError: true
    });
  }

  function postUpdate(data) {
    client(API_ADMIN_CATEGORY + `/${slug}/${detailType}`, {
      body: data,
      showError: true,
      showSuccess: true
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

    uploadFile(data);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!imageUrl) {
      M.toast({
        html: '<div>Have you clicked the SAVE button?</div>',
        classes: 'red rounded center top'
      });
      return;
    }

    const data = {
      banner: {
        image_url: imageUrl
      }
    };

    upsert(data);

    // await upsertData({
    //   method: 'post',
    //   endpoint: `/admin/categories/${slug}/${detailType}`,
    //   data
    // });
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

// CANT UNDERSTAND WHY if use FileUpload, every time I insert a picture, it refetch QUERY_KEY_ADMIN_CATEGORY_DETAILS!!!

// const UpsertBanner = ({slug, detailType}) => {
//   const [imageURL, FileUploadForm] = FileUpload();

//   const [upsert] = useMutation(postUpdate, {
//     onSuccess: () => queryCache.refetchQueries(QUERY_KEY_ADMIN_CATEGORY_DETAILS)
//   });

//   function postUpdate(data) {
//     client(API_ADMIN_CATEGORY + `/${slug}/${detailType}`, {
//       body: data,
//       showSuccess: true,
//       showError: true
//     });
//   }

//   const title = 'Add Banners';

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleSubmit = async e => {
//     e.preventDefault();
//     console.log(imageURL);

//     if (!imageURL) {
//       e.preventDefault();
//       M.toast({
//         html: `<div>Please upload image first!</div>`,
//         classes: 'red rounded center top'
//       });
//       return;
//     }

//     const data = {
//       banner: {
//         image_url: imageURL?.image?.url
//       }
//     };

//     upsert(data);
//   };

//   return (
//     <>
//       <h5 className="grey-text text-darken-3">{title}</h5>

//       <FileUploadForm />

//       <form
//         onSubmit={handleSubmit}
//         style={{ padding: 15, backgroundColor: '#eee' }}
//       >
//         {slug && (
//           <div className="input-field">
//             <label htmlFor="image_url" className="active">
//               Image URL
//             </label>
//             <input
//               type="text"
//               id="image_url"
//               value={imageURL}
//               required
//               disabled
//             />
//           </div>
//         )}

//         <button className="btn">{title}</button>
//         <div
//           className="btn"
//           onClick={() => {
//             props.closeForm();
//           }}
//         >
//           Cancel
//         </div>
//       </form>
//     </>
//   );
// };
