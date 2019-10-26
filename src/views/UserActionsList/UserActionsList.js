import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UserActionsToolbar, UserActionsTable } from './components';
import api from 'api';
import Context from 'Context';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserActionsList = () => {
  const classes = useStyles();
  const { user: { companyId } } = useContext(Context);

  const [userActions, setUserActions] = useState([]);

  useEffect(() => {
    api.get('/user-actions', {
      params: { companyId },
    })
      .then(response => setUserActions(response.data))
  }, [companyId]);

  return (
    <div className={classes.root}>
      <UserActionsToolbar />
      <div className={classes.content}>
        <UserActionsTable userActions={userActions} />
      </div>
    </div>
  );
};

export default UserActionsList;
