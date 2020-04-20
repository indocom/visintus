import React from 'react';
import { Link, Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Highlight,
  Category,
  CategoryDetails,
  User
} from '../components/admin';
import { LOGIN } from '~/constants/url';

export const Dashboard = props => {
  const { match } = props;
  const role = localStorage.getItem('role');
  if (role === 'admin' || role === 'superadmin') {
    return (
      <BrowserRouter>
        <div className="row">
          <div className="col s2" style={{ color: 'black' }}>
            <Link to={`${match.url}`}>
              <h4 style={{ width: '70%', margin: 'auto', padding: '0.5em' }}>
                Admin
              </h4>
            </Link>
            <hr />
            <ul
              style={{
                width: '70%',
                margin: 'auto',
                fontSize: '1.3em',
                padding: '0.5em'
              }}
            >
              <li>
                <Link to={`${match.url}/highlights`}>Home Highlights</Link>
              </li>
              <li>
                <Link to={`${match.url}/categories`}>Category</Link>
              </li>
              {role === 'superadmin' && (
                <li>
                  <Link to={`${match.url}/users`}>Manage Users</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="col s10 container" style={{ paddingLeft: '2em' }}>
            <Container route={props} />
          </div>
        </div>
      </BrowserRouter>
    );
  } else {
    return <Redirect to={LOGIN} />;
  }
};

const Container = ({ route }) => {
  const { match } = route;
  return (
    <Switch>
      <Route exact path={`${match.path}`} render={() => <h4>Hello Admin</h4>} />
      <Route exact path={`${match.path}/highlights`} component={Highlight} />
      <Route exact path={`${match.path}/users`} component={User} />
      <Route exact path={`${match.path}/categories`} component={Category} />
      <Route
        exact
        path={`${match.path}/categories/:slug`}
        component={CategoryDetails}
      />
    </Switch>
  );
};
