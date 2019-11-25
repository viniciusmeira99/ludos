import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Chip,
} from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Context from 'Context';

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
    height: '10 0px'
  },
  scoreContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
}));

const GameCard = props => {
  const { className, game, ...rest } = props;
  const { selectedGame, setSelectedGame } = useContext(Context);

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent
        className={clsx(classes.cardContentFixed)}
      >
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
        <div className={classes.scoreContainer}>
          <Chip
            color="primary"
            label={`Pontuação: ${game.score || 0}`}
          />
        </div>
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
          />
          <Grid
            className={classes.statsItem}
            item
            sm={3}
          >
            <Button
              color="primary"
              onClick={() => setSelectedGame(
                !selectedGame || selectedGame.id !== game.id ? game : null
              )}
              size="small"
            >
              {!selectedGame || selectedGame.id !== game.id ? 'Entrar' : 'Sair'}
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
