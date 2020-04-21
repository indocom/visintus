import React from 'react';
import Details from './Details';
import UpsertPlan from './Details/UpsertPlan';

export default ({ details, slug, detailType }) => (
  <Details
    details={details}
    detailType={detailType}
    slug={slug}
    initialState={{
      _id: '',
      name: '',
      description: ''
    }}
    upsertComponent={UpsertPlan}
  ></Details>
);
