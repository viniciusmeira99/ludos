import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { GamesToolbar, GamesTable } from './components';
import api from 'api';
import { Context } from 'context';
import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const GameList = () => {
  const classes = useStyles();
  const { user } = useContext(Context);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [games, setGames] = useState([]);

  useEffect(() => {
    api
      .get('/games', {
        params: { companyId: user.company.id },
      })
      .then(response => setGames(response.data));
  }, [user.company.id]);

  const deleteGame = (gameId) => {
    const snack = enqueueSnackbar('Deletar o jogo?', {
      autoHideDuration: 6000,
      action: (
        <Button
          color="secondary"
          onClick={() => {
            closeSnackbar(snack);

            api
              .delete(`/games/${gameId}`)
              .then(() => {
                enqueueSnackbar('Jogo deletado!', {
                  autoHideDuration: 6000,
                  variant: 'success',
                });

                api
                  .get('/games', {
                    params: { companyId: user.company.id },
                  })
                  .then(response => setGames(response.data));
              })
              .catch(() => {
                enqueueSnackbar('Não foi possível deletar o jogo', {
                  autoHideDuration: 6000,
                  variant: 'error',
                });
              });
          }}
          variant="text"
        >
          Deletar
        </Button>
      ),
    })

  };

  return (
    <div className={classes.root}>
      <GamesToolbar />
      <div className={classes.content}>
        <GamesTable
          deleteGame={deleteGame}
          games={games}
        />
      </div>
    </div>
  );
};

export default GameList;
