import React, { useState, useEffect, useContext } from 'react';
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
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';
import { Context } from 'context';
import api from 'api';
import { BackButton } from 'components';
import { useSnackbar } from 'notistack';
import { SelectMultiple } from '../SelectMultiple/';

const useStyles = makeStyles(() => ({
  root: {}
}));


const ActionDetails = props => {
  const { history } = props;
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const { user } = useContext(Context);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [userGames, setGames] = useState([]);

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

  useEffect(() => {
    api.get('/games', {
      params: { companyId: user.company.id },
    })
      .then(response => setGames(response.data))
  }, [user.company.id]);

  return (
    <Card className={classes.root}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <CardHeader
          subheader="Preencha os dados para lançar a ação"
          title="Lançamento de ações"
        />
        <Divider />
        <CardContent>
          
            <Grid
              item
              xs={12}
            >
              <Select
                fullWidth
                label="Nível"
                margin="dense"
                name="level"
                onChange={handleChange}
                required
                type="string"
                value={values.level || ''}
                variant="outlined"
              >
                 {userGames.map(game => (
                    <MenuItem value={game.id}>{game.name}</MenuItem>
                ))}
              </Select>
              <Typography variant="body1">
                Selecione o jogo para listar as categorias e usuários
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
            >
              <Select
                fullWidth
                label="Nível"
                margin="dense"
                name="level"
                onChange={handleChange}
                required
                type="string"
                value={values.level || ''}
                variant="outlined"
              >
                <MenuItem value="1">Venda realizada</MenuItem>
                <MenuItem value="2">Novo prospecto conseguido</MenuItem>
                <MenuItem value="3">Problema de cliente resolvido</MenuItem>
              </Select>
              <Typography variant="body1">
                Selecione a categoria
              </Typography>
            </Grid>
            
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            type="submit"
            variant="contained"
          >
            Lançar ação
          </Button>
          <BackButton />
        </CardActions>
      </form>
    </Card>
  );
};

ActionDetails.propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ActionDetails);
