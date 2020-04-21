import React from 'react';
import { Link } from 'react-router-dom';
import 'css/image.css';
import './categories-highlights.css';

const CategoriesHighlights = props => {
  const { categories } = props;
  const categoriesList =
    categories.length > 0 ? (
      categories.map((category, index) => {
        return (
          <div
            className="col s12 m6 l4 card z-depth-0 grey lighten-4"
            key={index}
          >
            <div
              className="card-image waves-effect waves-block waves-light"
              style={{ borderRadius: 5, boxShadow: '1px 3px 10px #aaa' }}
            >
              {
                <Link to={`/categories/${category.slug}`}>
                  <span className="card-title">{category.name}</span>
                  <div className="image-box-4-3">
                    <div className="image-content">
                      <img src={category.logo_url} alt="logo" />
                    </div>
                  </div>
                </Link>
              }
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">No data yet :(</div>
    );

  return (
    <div className="areas center">
      <h3>Interesting Areas</h3>
      <div className="row">{categoriesList}</div>
    </div>
  );
};

export default CategoriesHighlights;
