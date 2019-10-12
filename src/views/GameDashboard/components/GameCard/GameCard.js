import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ForwardIcon from '@material-ui/icons/Forward';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  cardContentFixed: {
    height: '170px'
  }
}));

const GameCard = props => {
  const { className, game, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent
        className={clsx(classes.cardContentFixed)}
      >
        <div className={classes.imageContainer}>
          <img
            alt="Product"
            className={classes.image}
            src="/images/products/product_2.png"
          />
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {game.name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {game.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            item
            sm={3}
          ></Grid>
          <Grid
            className={classes.statsItem}
            item
            sm={3}
          >
           <Button size="small" color="primary">
              Entrar
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

GameCard.propTypes = {
  className: PropTypes.string,
  game: PropTypes.object.isRequired
};

export default GameCard;
