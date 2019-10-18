import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 350,
  }
}));

const EmptyList = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={4}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <div className={classes.content}>
            <Typography variant="h1">
              {props.title}
            </Typography>
            {props.subtitle && (
              <Typography variant="subtitle2">
                {props.subtitle}
              </Typography>
            )}
            <img
              alt=""
              className={classes.image}
              src="/images/undraw_resume_folder_2_arse.svg"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

EmptyList.propTypes = {
  subtitle: PropTypes.node,
  title: PropTypes.node.isRequired,
};

export default EmptyList;
