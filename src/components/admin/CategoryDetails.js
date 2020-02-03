import React, { useEffect, useState } from 'react';
import axios from 'axios';

import BannerDetails from './Banner';
import PlanDetails from './Plan';
import RepDetails from './Reps';

export default props => {
  let slug = props.match.params.slug;
  let [details, setDetails] = useState([]);
  let [detailType, setDetailType] = useState('plans');

  useEffect(() => {
    async function FetchAllDetails() {
      const token = localStorage.getItem('token');
      let { data } = await axios
        .get(`/admin/categories/${slug}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: `${token}`
          },
          crossdomain: true
        })
        .catch(err => console.log(err));
      if (data) {
        if (!data.message) return;
        setDetails(data.message);
      } else {
        console.log(`Error in loading /admin/categories/${slug}`);
      }
      console.log(details);
    }
    FetchAllDetails();
  }, [details.length]);

  return (
    <>
      <h4>
        Category Details Page
        <div
          className="btn right"
          onClick={() => {
            props.history.push('/admin/categories');
          }}
        >
          Back to all categories
        </div>
      </h4>
      <div className="row">
        <div className="col s2">
          <p
            className="btn-large white black-text"
            style={
              detailType === 'banners'
                ? { display: 'block' }
                : { display: 'block', boxShadow: 'none' }
            }
            onClick={() => setDetailType('banners')}
          >
            Banners
          </p>
          <p
            className="btn-large white black-text"
            style={
              detailType === 'plans'
                ? { display: 'block' }
                : { display: 'block', boxShadow: 'none' }
            }
            onClick={() => setDetailType('plans')}
          >
            plans
          </p>
          <p
            className="btn-large white black-text"
            style={
              detailType === 'reps'
                ? { display: 'block' }
                : { display: 'block', boxShadow: 'none' }
            }
            onClick={() => setDetailType('reps')}
          >
            reps
          </p>
        </div>
        <div className="col s9 offset-s1 white z-depth-1">
          {(() => {
            switch (detailType) {
              case 'banners':
                return (
                  <BannerDetails
                    banners={details.banners}
                    setDetails={setDetails}
                    slug={slug}
                  />
                );
              case 'plans':
                return (
                  <PlanDetails
                    plans={details.plans}
                    setDetails={setDetails}
                    slug={slug}
                  />
                );
              case 'reps':
                return (
                  <RepDetails
                    reps={details.representatives}
                    setDetails={setDetails}
                    slug={slug}
                  />
                );
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </>
  );
};
