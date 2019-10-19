import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { ActionsToolbar, ActionsTable } from './components';
import api from 'api';
import Context from 'Context';
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

const ActionList = () => {
  const classes = useStyles();
  const { user } = useContext(Context);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [actions, setActions] = useState([]);

  useEffect(() => {
    api
      .get('/actions', {
        params: { companyId: user.company.id },
      })
      .then(response => setActions(response.data));
  }, [user.company.id]);

  const deleteAction = (actionId) => {
    const snack = enqueueSnackbar('Deletar a ação?', {
      autoHideDuration: 6000,
      action: (
        <Button
          color="secondary"
          onClick={() => {
            closeSnackbar(snack);

            api
              .delete(`/actions/${actionId}`)
              .then(() => {
                enqueueSnackbar('Ação deletada!', {
                  autoHideDuration: 6000,
                  variant: 'success',
                });

                api
                  .get('/actions', {
                    params: { companyId: user.company.id },
                  })
                  .then(response => setActions(response.data));
              })
              .catch(() => {
                enqueueSnackbar('Não foi possível deletar a ação', {
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
      <ActionsToolbar />
      <div className={classes.content}>
        <ActionsTable
          deleteAction={deleteAction}
          actions={actions}
        />
      </div>
    </div>
  );
};

export default ActionList;
