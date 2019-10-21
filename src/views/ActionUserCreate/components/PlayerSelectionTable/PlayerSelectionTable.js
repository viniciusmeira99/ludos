import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

import { getInitials } from 'helpers';
import api from 'api';
import { LEVEL_USER } from 'consts';

const useStyles = makeStyles(theme => ({
  root: {},
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
}));

const PlayerSelectionTable = props => {
  const { companyId, onChange } = props;
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users', {
      params: { companyId },
    })
      .then(response => setUsers(response.data.filter(user => user.level === LEVEL_USER)))
  }, [companyId]);

  /* 
  Função que fica executando em loop 
  useEffect(() => {
    api.get('/user-games', {
      params: { gameId: 2},
    })
    .then(response => setUsers(response.data.filter(user => user.level === LEVEL_USER)))
  }); */

  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    onChange(selectedUsers)
  }, [selectedUsers]);

  const handleSelectAll = event => {
    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  return (
    <PerfectScrollbar>
      <div className={classes.inner}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedUsers.length === users.length}
                  color="primary"
                  indeterminate={
                    selectedUsers.length > 0 &&
                    selectedUsers.length < users.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Data do cadastro</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow
                className={classes.tableRow}
                hover
                key={user.id}
                selected={selectedUsers.indexOf(user.id) !== -1}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedUsers.indexOf(user.id) !== -1}
                    color="primary"
                    onChange={event => handleSelectOne(event, user.id)}
                    value="true"
                  />
                </TableCell>
                <TableCell>
                  <div className={classes.nameContainer}>
                    <Avatar
                      className={classes.avatar}
                      src={user.avatarUrl}
                    >
                      {getInitials(user.name)}
                    </Avatar>
                    <Typography variant="body1">{user.name}</Typography>
                  </div>
                </TableCell>
                <TableCell>
                  {moment(user.createdAt).format('DD/MM/YYYY')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PerfectScrollbar>
  );
};

PlayerSelectionTable.propTypes = {
  companyId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PlayerSelectionTable;
