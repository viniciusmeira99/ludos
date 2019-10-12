import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  UserCreate as UserCreateView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  GameList as GameListView,
  GameCreate as GameCreateView,
  GameDashboard as GameDashboardView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={DashboardView}
        exact
        isPrivate
        layout={MainLayout}
        path="/"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        isAdminOnly
        isPrivate
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={UserCreateView}
        exact
        isAdminOnly
        isPrivate
        layout={MainLayout}
        path="/users/create"
      />
      <RouteWithLayout
        component={GameListView}
        exact
        isAdminOnly
        isPrivate
        layout={MainLayout}
        path="/games"
      />
      <RouteWithLayout
        component={GameCreateView}
        exact
        isAdminOnly
        isPrivate
        layout={MainLayout}
        path="/games/create"
      />
      <RouteWithLayout
        component={GameDashboardView}
        exact
        isPrivate
        layout={MainLayout}
        path="/game-select"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        isPrivate
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        isPrivate
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        isPrivate
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        isPrivate
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        isPrivate
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/criar-conta"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/entrar"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect
        path="/sair"
        to="/entrar"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
