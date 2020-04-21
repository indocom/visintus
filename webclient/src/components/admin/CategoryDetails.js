import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import { client } from '~/utils/client';
import { QUERY_KEY_ADMIN_CATEGORY_DETAILS } from '~/constants/query-keys';
import { API_ADMIN_CATEGORY } from '~/constants/api-url';

import { BannerDetails, PlanDetails, RepDetails } from './categories';

const PLAN_DETAIL = 'plans';
const BANNER_DETAIL = 'banners';
const REP_DETAIL = 'representatives';
const DEFAULT_PAGE_OPEN = PLAN_DETAIL;

export default props => {
  let slug = props.match.params.slug;
  let [pageOpen, setPageOpen] = useState(DEFAULT_PAGE_OPEN);

  const {
    data: categoryDetails,
    status: fetchStatus,
    error: fetchError
  } = useQuery(
    QUERY_KEY_ADMIN_CATEGORY_DETAILS,
    () => client(API_ADMIN_CATEGORY + `/${slug}`),
    {
      staleTime: 10000
    }
  );

  let allDetailsView = fetchStatus === 'success' && (
    <div className="row">
      <div className="col s2">
        <p
          className="btn-large white black-text"
          style={
            pageOpen === BANNER_DETAIL
              ? { display: 'block' }
              : { display: 'block', boxShadow: 'none' }
          }
          onClick={() => setPageOpen(BANNER_DETAIL)}
        >
          Banners
        </p>
        <p
          className="btn-large white black-text"
          style={
            pageOpen === PLAN_DETAIL
              ? { display: 'block' }
              : { display: 'block', boxShadow: 'none' }
          }
          onClick={() => setPageOpen(PLAN_DETAIL)}
        >
          plans
        </p>
        <p
          className="btn-large white black-text"
          style={
            pageOpen === REP_DETAIL
              ? { display: 'block' }
              : { display: 'block', boxShadow: 'none' }
          }
          onClick={() => setPageOpen(REP_DETAIL)}
        >
          reps
        </p>
      </div>
      <div className="col s9 offset-s1 white z-depth-1">
        {(() => {
          switch (pageOpen) {
            case PLAN_DETAIL:
              return (
                <PlanDetails
                  details={categoryDetails?.plans}
                  detailType={PLAN_DETAIL}
                  slug={slug}
                />
              );
            case BANNER_DETAIL:
              return (
                <BannerDetails
                  details={categoryDetails?.banners}
                  detailType={BANNER_DETAIL}
                  slug={slug}
                />
              );
            case REP_DETAIL:
              return (
                <RepDetails
                  details={categoryDetails?.representatives}
                  detailType={REP_DETAIL}
                  slug={slug}
                />
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );

  if (fetchError) {
    allDetailsView = <p>Some error happened!</p>;
  }

  return (
    <div style={{ width: '90%' }}>
      <h4>
        <p style={{ fontSize: 24, display: 'inline' }}>
          Category Details ( {slug} )
        </p>
        <div
          className="btn right"
          onClick={() => {
            props.history.push('/admin/categories');
          }}
        >
          Back to all categories
        </div>
      </h4>
      {allDetailsView}
    </div>
  );
};
