import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Context } from 'context';

const RouteWithLayout = props => {
  const { 
    layout: Layout, 
    isPrivate,
    component: Component, 
    ...rest 
  } = props;


  const { user } = useContext(Context);

  return (
    <Route
      {...rest}
      render={matchProps => (
        isPrivate && !user 
          ? <Redirect to="/entrar" />
          : <Layout><Component {...matchProps} /></Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  isPrivate: PropTypes.bool,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

RouteWithLayout.defaultPros = {
  isPrivate: false,
};

export default RouteWithLayout;
