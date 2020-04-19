import React from 'react';
import { useQuery } from 'react-query';

import CategoryDropdown from '../components/category/CategoryDropdown';
import CategoryPeople from '../components/category/CategoryPeople';
import Carousel from '../components/Carousel';
import NotFound from './404';
import Loading from 'components/Loading';
import { client } from 'hooks/client';
import { QUERY_KEY_CATEGORY } from 'constants/query-keys';
import { API_CATEGORIES } from 'constants/api-url';

import '../index.css';
import '../css/area.css';

const Category = props => {
  const slug = props.match.params.slug;
  const { status, data, error } = useQuery(
    [QUERY_KEY_CATEGORY, slug],
    (_, slug) => client(`${API_CATEGORIES}/${slug}`)
  );

  if (status === 'loading') {
    return <Loading />;
  }

  return !error ? (
    <div className="container area">
      <Carousel banners={data.banners} />
      <CategoryDropdown plans={data.plans} slug={props.match.params.slug} />
      <CategoryPeople reps={data.representatives} />
    </div>
  ) : (
    <NotFound />
  );
};

export default Category;
