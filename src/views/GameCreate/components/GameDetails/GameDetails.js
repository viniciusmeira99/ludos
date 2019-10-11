import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from '@material-ui/core';
import { Context } from 'context';
import api from 'api';
import { BackButton } from 'components';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(() => ({
  root: {}
}));


const GameDetails = props => {
  const { history } = props;
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const { user } = useContext(Context);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});

  const handleChange = event => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value
    };

    setValues(newValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/games', {
      ...values,
      companyId: user.companyId,
    })
      .then(() => {
        setValues({});
        enqueueSnackbar('Jogo cadastrado', { variant: 'success',  });
        history.goBack();
      }).catch((err) => {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };

  return (
    <Card className={classes.root}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <CardHeader
          subheader="Digite os dados do novo jogo"
          title="Cadastro de jogos"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                error={!!errors && errors.name}
                fullWidth
                helperText={errors && errors.name && errors.name[0]}
                label="Nome"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={!!errors && errors.description}
                fullWidth
                helperText={errors && errors.description && errors.description[0]}
                label="Descrição"
                margin="dense"
                name="description"
                onChange={handleChange}
                required
                value={values.description || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                error={!!errors && errors.startDate}
                fullWidth
                helperText={errors && errors.startDate && errors.startDate[0]}
                label="Data inicial"
                margin="dense"
                name="startDate"
                onChange={handleChange}
                required
                value={values.startDate || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                error={!!errors && errors.endDate}
                fullWidth
                helperText={errors && errors.endDate && errors.endDate[0]}
                label="Data inicial"
                margin="dense"
                name="endDate"
                onChange={handleChange}
                required
                value={values.endDate || ''}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            type="submit"
            variant="contained"
          >
            Criar jogo
          </Button>
          <BackButton />
        </CardActions>
      </form>
    </Card>
  );
};

GameDetails.propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(GameDetails);
