import React from 'react';
import Details from './Details';
import UpsertReps from './Details/UpsertReps';

export default ({ details, slug, detailType }) => (
  <Details
    details={details}
    detailType={detailType}
    slug={slug}
    initialState={{
      _id: '',
      name: '',
      description: '',
      photo_url: ''
    }}
    upsertComponent={UpsertReps}
  ></Details>
);
