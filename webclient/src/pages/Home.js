import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import CategoriesHighlights from '../components/home/CategoriesHighlights.js';
import Carousel from '../components/Carousel.js';
import { client } from 'hooks/client.js';
import Loading from 'components/Loading.js';

const Home = () => {
  const {
    status: highlightsStatus,
    data: highlights,
    error: highlightsError
  } = useQuery('highlights', () => client('api/highlights'));
  const {
    status: categoriesStatus,
    data: categories,
    error: categoriesError
  } = useQuery('categories', () => client('api/categories'));

  return (
    <div className="Home">
      {highlightsStatus === 'loading' ? (
        <Loading />
      ) : (
        !highlightsError && <Carousel banners={highlights} />
      )}
      <div className="container area">
        {categoriesStatus === 'loading' ? (
          <Loading />
        ) : (
          !categoriesError && <CategoriesHighlights categories={categories} />
        )}
      </div>
      <div
        className="planAVisit center"
        style={{ paddingBottom: '70px', width: '100%' }}
      >
        <Link
          to="/itinerary"
          className="waves-effect waves-light btn btn-large"
        >
          Plan A Visit!
        </Link>
      </div>
    </div>
  );
};

export default Home;
