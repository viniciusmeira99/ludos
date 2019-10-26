import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { MyActionsTable } from './components';
import api from 'api';
import Context from 'Context';
import { EmptyList } from 'components';
import {  Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const MyActionsList = () => {
  const classes = useStyles();
  const { user: { id: userId, companyId }, selectedGame } = useContext(Context);

  const [userActions, setUserActions] = useState([]);

  useEffect(() => {
    if (!selectedGame) {
      setUserActions([])
      return;
    }

    const { id: gameId } = selectedGame;
    api.get('/user-actions', {
      params: { userId, gameId, companyId },
    })
      .then(response => setUserActions(response.data))
  }, [userId, selectedGame, companyId]);

  if (!selectedGame) {
    return (
      <EmptyList
        subtitle={(
          <>
            Você precisa selecionar um jogo para continuar.
            <br />
            <Link to="/game-select">
              <Button
                variant="text"
              >
                Selecionar jogo
              </Button>
            </Link>
          </>
        )}
        title="Nenhum jogo selecionado."
      />
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <MyActionsTable userActions={userActions} />
      </div>
    </div>
  );
};

export default MyActionsList;
