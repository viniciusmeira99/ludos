import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  TableCell,
  Typography,
} from '@material-ui/core';

import { getInitials, getImage } from 'helpers';

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

const UserTableCell = props => {
  const { image, name } = props;
  const classes = useStyles();

  return (
    <TableCell>
      <div className={classes.nameContainer}>
        <Avatar
          className={classes.avatar}
          src={getImage({ image })}
        >
          {getInitials(name)}
        </Avatar>
        <Typography variant="body1">{name}</Typography>
      </div>
    </TableCell>
  );
};

UserTableCell.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default UserTableCell;
