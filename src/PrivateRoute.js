import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from 'Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(Context);
  return (
    <Route
      {...rest}
      render={(props) => (
        user
          ? <Component {...props} />
          : <Redirect to="/login" />
      )}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};


export default PrivateRoute;
