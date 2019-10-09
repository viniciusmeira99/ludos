import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Context } from 'context';
import { LEVEL_ADMIN, LEVEL_USER } from 'consts';

const RouteWithLayout = props => {
  const { 
    layout: Layout, 
    isAdminOnly,
    isUserOnly,
    isPrivate,
    component: Component, 
    ...rest 
  } = props;


  const { user } = useContext(Context);

  return (
    <Route
      {...rest}
      render={(matchProps) => {
        if (isPrivate && !user) {
          return <Redirect to="/entrar" />;
        }

        if (isAdminOnly && user.level !== LEVEL_ADMIN) {
          return <Redirect to="/not-found" />;
        }

        if (isUserOnly && user.level !== LEVEL_USER) {
          return <Redirect to="/not-found" />;
        }

        return <Layout><Component {...matchProps} /></Layout>;
      }}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  isAdminOnly: PropTypes.bool,
  isPrivate: PropTypes.bool,
  isUserOnly: PropTypes.bool,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

RouteWithLayout.defaultPros = {
  isPrivate: false,
  isAdminOnly: false,
  isUserOnly: false,
};

export default RouteWithLayout;
