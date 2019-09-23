import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import api from 'api';
import { Context } from 'context';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();
  const { user } = useContext(Context);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users', { 
      params: user.company.id,
    })
      .then(response => setUsers(response.data))
  }, [user.company.id]);

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
