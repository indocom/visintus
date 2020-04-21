import React, { useState } from 'react';
import DetailsView from './DetailsView';

export default function Details({
  details,
  slug,
  detailType,
  initialState = {},
  upsertComponent
}) {
  let [isActive, setIsActive] = useState(false); //is UpsertData active
  let [detailInfo, setDetailInfo] = useState(initialState);

  //   {
  //   _id: '',
  //   name: '',
  //   description: ''
  // }); example of initial state

  const handleUpsert = detailInfo => {
    setIsActive(!isActive);
    setDetailInfo(detailInfo);
  };

  // need to use this because of difference in data schema
  const upsertWrapper = WrappedComponent => {
    return (
      <WrappedComponent
        detailType={detailType}
        slug={slug}
        detailInfo={detailInfo}
        closeForm={() => setIsActive(!isActive)}
      />
    );
  };

  return (
    <>
      <h5 id="header" style={{ textTransform: 'capitalize' }}>
        {detailType} Details
        <button
          onClick={() =>
            handleUpsert({
              _id: '',
              name: '',
              description: ''
            })
          }
          className="btn btn-small right"
        >
          Add {detailType}
        </button>
      </h5>
      {/* Input form to add or update. slug property to determine API endpoint */}
      {isActive && upsertWrapper(upsertComponent)}
      <DetailsView
        details={details}
        detailType={detailType}
        slug={slug}
        handleUpsert={handleUpsert}
      />
    </>
  );
}

{
  /* <UpsertDetail
  detailInfo={detailInfo}
  detailType = {detailType}
  slug={slug}
  closeForm={() => setIsActive(!isActive)}
/> */
}
