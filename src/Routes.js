import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  UserList as UserListView,
  UserCreate as UserCreateView,
  Account as AccountView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  GameList as GameListView,
  GameCreate as GameCreateView,
  GameDashboard as GameDashboardView,
  ActionCreate as ActionCreateView,
  ActionList as ActionListView,
  UserActionsList as UserActionsListView,
  MyActionsList as MyActionsListView,
  UserActionsCreate as UserActionsCreateView,
  QuestionList as QuestionListView,
  QuestionCreate as QuestionCreateView,
  UserQuestions as UserQuestionsView,
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
        component={GameCreateView}
        exact
        isAdminOnly
        isPrivate
        layout={MainLayout}
        path="/games/:gameId/edit"
      />
      <RouteWithLayout
        component={QuestionListView}
        exact
        isAdminOnly
        isPrivate
        layout={MainLayout}
        path="/questions"
      />
      <RouteWithLayout
        component={QuestionCreateView}
        exact
        isAdminOnly
        isPrivate
        layout={MainLayout}
        path="/questions/create"
      />
      <RouteWithLayout
        component={GameDashboardView}
        exact
        isPrivate
        layout={MainLayout}
        path="/game-select"
      />
      <RouteWithLayout
        component={UserQuestionsView}
        exact
        isPrivate
        layout={MainLayout}
        path="/user-questions"
      />
      <RouteWithLayout
        component={ActionCreateView}
        exact
        isAdminOnly
        isPrivate
        layout={MainLayout}
        path="/actions/create"
      />
      <RouteWithLayout
        component={ActionListView}
        exact
        isAdminOnly
        isPrivate
        layout={MainLayout}
        path="/actions"
      />
      <RouteWithLayout
        component={UserActionsListView}
        exact
        isAdminOnly
        isPrivate
        layout={MainLayout}
        path="/user-actions"
      />
      <RouteWithLayout
        component={MyActionsListView}
        exact
        isPrivate
        isUserOnly
        layout={MainLayout}
        path="/my-actions"
      />
      <RouteWithLayout
        component={UserActionsCreateView}
        exact
        isAdminOnly
        isPrivate
        layout={MainLayout}
        path="/user-actions/create"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        isPrivate
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect
        path="/sair"
        to="/sign-in"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
