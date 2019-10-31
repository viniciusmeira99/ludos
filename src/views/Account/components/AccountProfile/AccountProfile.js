import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
} from '@material-ui/core';
import Context from 'Context';
import { getInitials, getImage } from 'helpers';
import { ImageModal } from '../../components';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 100,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;

  const { user } = useContext(Context);
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user.name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.email}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.company.name}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={getImage(user)}
          >
            {getInitials(user.name)}
          </Avatar>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <ImageModal />
      </CardActions>
    </Card>

  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
